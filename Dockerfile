# Stage 1: Temporary image to install dependencies
FROM registry.gitlab.com/owlebot/docker-registry/base AS dependencies

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# ts
COPY tsconfig.json ./
COPY decs.d.ts ./

# tsoa
COPY tsoa.json ./

# source
COPY src ./src

RUN yarn install --network-concurrency 1
RUN ls -la
RUN yarn build

# Stage 2: Final image with code and installed dependencies
FROM node:20-alpine AS final

WORKDIR /app

# Copy necessary files from the dependencies stage
COPY --from=dependencies /app/package.json ./package.json
COPY --from=dependencies /app/yarn.lock ./yarn.lock
COPY --from=dependencies /app/build ./build

RUN yarn install --prod --network-concurrency 1

EXPOSE 3000
CMD [ "yarn", "start:prod" ]

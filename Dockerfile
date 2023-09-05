# Stage 1: Temporary image to install dependencies
FROM registry.gitlab.com/owlebot/docker-registry/base AS dependencies

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --prod --network-concurrency 1

# Stage 2: Final image with code and installed dependencies
FROM node:18 AS final

WORKDIR /app

# Copy necessary files from the dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/package.json ./package.json
COPY --from=dependencies /app/yarn.lock ./yarn.lock

COPY ./src ./src

EXPOSE 3000
CMD [ "yarn", "start:prod" ]

import { createEsmHooks, register } from "ts-node";

export const { resolve, load, getFormat, transformSource } = createEsmHooks(
	register( { transpileOnly: true, swc: false, esm: true } )
);

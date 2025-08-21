/**
 * We need this file only to register a TSX loader.
 */
// @ts-expect-error Not sure why this is complaining; `tsx` package _does_ have types.
import { register } from "tsx/esm/api";

register();

await (async () => {
    await import("./buildPackageWorker.ts");
})();

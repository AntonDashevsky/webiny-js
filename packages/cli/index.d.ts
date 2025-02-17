import { CliContext } from "./types";

export * from "./regions";
export { PackageJson } from "./utils/PackageJson";

export declare const getCli: () => CliContext;

export declare function initializeProject(): Promise<void>;

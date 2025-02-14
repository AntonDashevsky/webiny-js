#!/usr/bin/env -S npx tsx
import path from "path";
import { cjsToEsm } from "./cjsToEsm";

const rootFolder = process.argv[2];
const absolutePath = path.resolve(rootFolder);
const shouldTransformProject = process.argv.includes("--transform");


if (shouldTransformProject) {
    console.log("Transforming project to ESM...");
    cjsToEsm(absolutePath);
}

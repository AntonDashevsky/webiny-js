import { hashElement } from "folder-hash";
import type { Package } from "./types";

export async function getPackageSourceHash(workspacePackage: Package) {
    const { hash } = await hashElement(workspacePackage.packageFolder, {
        folders: { exclude: ["dist", "lib"] },
        files: { exclude: ["tsconfig.build.tsbuildinfo"] }
    });

    return hash;
}

import { getExtensionsFromFilesystem } from "./getExtensionsFromFilesystem.js";
import { Extension } from "~/extensions/Extension.js";

export const linkAllExtensions = async () => {
    const allExtensions = getExtensionsFromFilesystem();

    for (const allExtension of allExtensions) {
        const extension = await Extension.fromPackageJsonPath(allExtension.paths.packageJson);
        if (extension) {
            await extension.link();
        }
    }
};

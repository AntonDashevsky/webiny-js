import { updatePackages, presets, getUserInput } from "./updatePackagesLib/index.ts";

(async () => {
    const input = await getUserInput({
        presets
    });
    if (!input) {
        return;
    }

    return updatePackages({
        input
    });
})();

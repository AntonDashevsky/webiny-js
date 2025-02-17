import "tsx";
import path from "path";

(async () => {
    const rootFolder = process.argv[2];
    const absolutePath = path.resolve(rootFolder);
    const shouldTransformProject = process.argv.includes("--transform");

    if (shouldTransformProject) {
        console.log("Transforming project to ESM...");
        const { cjsToEsm } = await import("./cjsToEsm.js");
        await cjsToEsm(absolutePath);
    }
})();

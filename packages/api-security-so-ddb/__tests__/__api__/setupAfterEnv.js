import { resolve } from "path";
import { setupDynalite } from "@webiny/project-utils/testing/dynalite/index.js";

(async () => {
    const dirname = new URL(".", import.meta.url).toString().replace("file://", "");
    const setupPath = resolve(dirname, "../../");
    await setupDynalite(setupPath);
})();

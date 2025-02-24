import { resolve } from "path";
import { setupDynalite } from "@webiny/project-utils/testing/dynalite/index.js";

await setupDynalite(resolve(import.meta.dirname, "../../"));

import fs from "node:fs/promises";
import path from "path";
import { createWatchPackage, createBuildPackage } from "@webiny/project-utils";

const __dirname = import.meta.dirname;

export default {
    commands: {
        build: async (options, context) => {
            await createBuildPackage({ cwd: __dirname })(options, context);
            const from = path.join(__dirname, "templates");
            const to = path.join(__dirname, "dist/templates");
            await fs.cp(from, to, { recursive: true });
        },
        watch: createWatchPackage({ cwd: __dirname })
    }
};

import { createWatchPackage, createBuildPackage } from "@webiny/build-tools";
import path from "path";
import fs from "node:fs";

const __dirname = import.meta.dirname;

export default {
    commands: {
        build: async (options, context) => {
            await createBuildPackage({ cwd: __dirname })(options, context);
            {
                const from = path.join(__dirname, "tailwind.config.js");
                const to = path.join(__dirname, "dist/tailwind.config.js");
                fs.cpSync(from, to);
            }
            {
                const from = path.join(__dirname, "tailwind.config.theme.js");
                const to = path.join(__dirname, "dist/tailwind.config.theme.js");
                fs.cpSync(from, to);
            }
        },
        watch: createWatchPackage({ cwd: __dirname })
    }
};

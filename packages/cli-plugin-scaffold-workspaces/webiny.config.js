import util from "util";
import path from "path";
import ncpBase from "ncp";
import { createWatchPackage, createBuildPackage } from "@webiny/project-utils";

const ncp = util.promisify(ncpBase.ncp);

const __dirname = import.meta.dirname;

export default {
    commands: {
        build: async (options, context) => {
            await createBuildPackage({ cwd: __dirname })(options, context);
            const from = path.join(__dirname, "templates");
            const to = path.join(__dirname, "dist/templates");
            await ncp(from, to);
        },
        watch: createWatchPackage({ cwd: __dirname })
    }
};

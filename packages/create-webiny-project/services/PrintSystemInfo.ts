import { SystemRequirements } from "@webiny/system-requirements";
import chalk from "chalk";
import { GetCwpVersion } from "./GetCwpVersion.js";

const { bold, gray } = chalk;

const NOT_APPLICABLE = gray("N/A");
const HL = bold(gray("—")).repeat(30);

export class PrintSystemInfo {
    execute() {
        const node = SystemRequirements.getNodeVersion();
        const os = SystemRequirements.getOsVersion();

        let npm = NOT_APPLICABLE;
        try {
            npm = SystemRequirements.getNpmVersion();
        } catch {}

        let npx = NOT_APPLICABLE;
        try {
            npx = SystemRequirements.getNpxVersion();
        } catch {}

        let yarn = NOT_APPLICABLE;
        try {
            yarn = SystemRequirements.getYarnVersion();
        } catch {}

        let cwpVersion = NOT_APPLICABLE;
        try {
            const getCwpVersion = new GetCwpVersion();
            cwpVersion = getCwpVersion.execute();
        } catch {}

        console.log(cwp);

        let templateOptionsJson = "{}";
        if (templateOptions) {
            try {
                templateOptionsJson = cwp.params.templateOptions;
            } catch {}
        }

        console.log(
            [
                "",
                `${bold("Error Logs")}`,
                HL,
                err.message,
                debug && err.stack,
                "",
                `${bold("System Information")}`,
                HL,
                `create-webiny-project: ${cwpVersion}`,
                `Operating System: ${os}`,
                `Node: ${node}`,
                `Yarn: ${yarn}`,
                `Npm: ${npm}`,
                `Npx: ${npx}`,
                `Template: ${cwpTemplate}`,
                `Template Options: ${templateOptionsJson}`,
                "",
                "Please open an issue including the error output at https://github.com/webiny/webiny-js/issues/new.",
                "You can also get in touch with us on our Slack Community: https://www.webiny.com/slack",
                ""
            ].join("\n")
        );
    }
}

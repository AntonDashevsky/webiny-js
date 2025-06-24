import { createImplementation } from "@webiny/di-container";
import {
    GetPulumiVersion,
    GetPulumiVersionResult,
    PulumiAwsVersion,
    PulumiVersion
} from "~/abstractions";
import execa from "execa";

export class DefaultGetPulumiVersion implements GetPulumiVersion.Interface {
    execute() {
        let pulumi: PulumiVersion = "",
            pulumiAws: PulumiAwsVersion = "";

        try {
            {
                const { stdout } = execa.sync("yarn", [
                    "info",
                    "@pulumi/pulumi",
                    "-A",
                    "-R",
                    "--name-only",
                    "--json"
                ]);

                const match = stdout.match(/npm:(.*?)"/);
                if (match) {
                    pulumi = match[1];
                }
            }

            {
                const { stdout } = execa.sync("yarn", [
                    "info",
                    "@pulumi/aws",
                    "-A",
                    "-R",
                    "--name-only",
                    "--json"
                ]);

                const match = stdout.match(/npm:(.*?)"/);
                if (match) {
                    pulumiAws = match[1];
                }
            }
        } catch (err) {
            return ["", ""] as GetPulumiVersionResult;
        }

        return [pulumi || "", pulumiAws || ""] as GetPulumiVersionResult;
    }
}

export const getPulumiVersion = createImplementation({
    abstraction: GetPulumiVersion,
    implementation: DefaultGetPulumiVersion,
    dependencies: []
});

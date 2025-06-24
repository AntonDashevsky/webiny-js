import { createImplementation } from "@webiny/di-container";
import {
    GetPulumiVersion,
} from "~/abstractions";
import execa from "execa";

export class DefaultGetPulumiVersion implements GetPulumiVersion.Interface {
    execute() {
        let result : GetPulumiVersion.Result = ["", ""];

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
                    result[0] = match[1];
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
                    result[1] = match[1];
                }
            }
        } catch (err) {
            // Do nothing.
        }

        return result;
    }
}

export const getPulumiVersion = createImplementation({
    abstraction: GetPulumiVersion,
    implementation: DefaultGetPulumiVersion,
    dependencies: []
});

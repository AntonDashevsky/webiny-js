import { Abstraction } from "@webiny/di-container";
import { z } from "zod";
import path from "path";
import fs from "fs";

export const zodPathToAbstraction = (expectedClass: Abstraction<any>) => {
    return z
        .string()
        .describe(`Path to a file exporting ${expectedClass.token.toString()}`)
        .refine(
            src => {
                // TODO: we should probably find a better way to get the current working directory (somehow from ProjectSdk).
                const cwd = process.cwd();
                const absoluteSrcPath = path.join(cwd, src);
                if (!fs.existsSync(absoluteSrcPath)) {
                    throw new Error(
                        `Source file does not exist: ${absoluteSrcPath}. Please provide a valid path.`
                    );
                }

                // if (this.definition.abstraction) {
                //     const { default: exportedImplementation } = await import(absoluteSrcPath);

                //     if (!exportedImplementation) {
                //         throw new Error(
                //             `Source file for extension "${name}" (type: ${this.definition.type}) must have a default export.`
                //         );
                //     }

                //     const metadata = new Metadata(exportedImplementation);
                //     const metadataName = metadata.getAbstraction().toString();
                //     const defName = this.definition.abstraction.toString();
                //     const isCorrectAbstraction =
                //         metadata.getAbstraction() === this.definition.abstraction;
                //     if (!isCorrectAbstraction) {
                //         throw new Error(
                //             `Source file for extension "${name}" (type: ${
                //                 this.definition.type
                //             }) must export a class that implements the "${this.definition.abstraction.toString()}" abstraction.`
                //         );
                //     }
                // }

                return true;
            },
            { message: "Path does not export the expected abstraction." }
        );
};

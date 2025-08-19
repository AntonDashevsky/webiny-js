import { Abstraction, Metadata } from "@webiny/di-container";
import { z } from "zod";
import path from "path";
import fs from "fs";
import { ProjectSdk } from "~/ProjectSdk.js";

export const zodPathToAbstraction = (expectedAbstraction: Abstraction<any>) => {
    return z
        .string()
        .describe(`Path to a file exporting ${expectedAbstraction.token.toString()}`)
        .superRefine(async (src, ctx) => {
            // This should probably be done in a better way. Would be nice to simply
            // access the project within the already initialized SDK. For now,
            // we will initialize the SDK here, which will also initialize the project.
            const projectSdk = await ProjectSdk.init();
            const project = await projectSdk.getProject();
            const absoluteSrcPath = path.join(project.paths.rootFolder.absolute, src);
            if (!fs.existsSync(absoluteSrcPath)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Source file does not exist: ${absoluteSrcPath}. Please provide a valid path.`
                });
                return;
            }

            const { default: exportedImplementation } = await import(absoluteSrcPath);

            if (!exportedImplementation) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Source file for extension "${src}" (type: ${expectedAbstraction.token.toString()}) must export a default implementation.`
                });
                return;
            }

            const metadata = new Metadata(exportedImplementation);
            const metadataName = metadata.getAbstraction().toString();
            const defName = expectedAbstraction.toString();
            const isCorrectAbstraction = metadataName === defName;
            if (!isCorrectAbstraction) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Source file for extension "${src}" (type: ${expectedAbstraction.token.toString()}) must export a class that implements the "${expectedAbstraction.token.toString()}" abstraction.`
                });
            }

            return true;
        });
};

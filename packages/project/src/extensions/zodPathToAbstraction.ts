import { Abstraction, Metadata } from "@webiny/di-container";
import { z } from "zod";
import path from "path";
import fs from "fs";

export const zodPathToAbstraction = (expectedAbstraction: Abstraction<any>) => {
    return z
        .string()
        .describe(`Path to a file exporting ${expectedAbstraction.token.toString()}`)
        .superRefine(async (src, ctx) => {
            // TODO: we should probably find a better way to get the current working directory (somehow from ProjectSdk).
            const cwd = process.cwd();
            const absoluteSrcPath = path.join(cwd, src);
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

import { z } from "zod";
import path from "path";
import fs from "fs";
import { IProjectModel } from "~/abstractions/models";

export const zodPathToFile = (project: IProjectModel) => {
    return z
        .string()
        .describe(`Path to a file`)
        .superRefine(async (src, ctx) => {
            let absoluteSrcPath = src;
            if (!path.isAbsolute(src)) {
                absoluteSrcPath = path.join(project.paths.rootFolder.absolute, src);
            }

            if (!fs.existsSync(absoluteSrcPath)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Source file does not exist: ${absoluteSrcPath}. Please provide a valid path.`
                });
                return;
            }

            return true;
        });
};

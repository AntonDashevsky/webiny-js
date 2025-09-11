import { z } from "zod";
import path from "path";
import fs from "fs";
import { type IProjectModel } from "~/abstractions/models/index.js";

export const zodPathToFile = (project: IProjectModel) => {
    return z
        .string()
        .describe(`Path to a file`)
        .superRefine(async (src, ctx) => {
            let absoluteSrcPath = src;
            if (!path.isAbsolute(src)) {
                absoluteSrcPath = project.paths.rootFolder.join(src).toString();
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

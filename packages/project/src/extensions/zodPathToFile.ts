import { z } from "zod";
import path from "path";
import fs from "fs";
import { ProjectSdk } from "~/ProjectSdk.js";

export const zodPathToFile = () => {
    return z
        .string()
        .describe(`Path to a file`)
        .superRefine(async (src, ctx) => {
            // This should probably be done in a better way. Would be nice to simply
            // access the project within the already initialized SDK. For now,
            // we will initialize the SDK here, which will also initialize the project.
            const projectSdk = await ProjectSdk.init();
            const project = await projectSdk.getProject();

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

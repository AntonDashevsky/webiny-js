import path from "path";
import fs from "fs-extra";

export const updateDotEnv = cwp => {
    const { projectRootFolder: projectRootPath, region } = cwp.params.paths;
    const rootEnvFilePath = path.join(projectRootPath, ".env");
    let content = fs.readFileSync(rootEnvFilePath).toString();
    content = content.replace("{REGION}", region);
    fs.writeFileSync(rootEnvFilePath, content);
};

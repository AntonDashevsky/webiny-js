import fs from "fs-extra";

export class EnsureNoTargetFolder {
    execute(projectRootPath, projectName, force) {
        if (fs.existsSync(projectRootPath)) {
            if (!force) {
                console.log(
                    `Cannot continue because the target folder ${red(projectName)} already exists.`
                );
                console.log(
                    `If you still wish to proceed, run the same command with the ${red(
                        "--force"
                    )} flag.`
                );
                process.exit(1);
            }
        }
    }
}

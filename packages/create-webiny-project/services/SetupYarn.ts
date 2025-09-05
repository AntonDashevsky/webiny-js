import path from "path";
import fs from "fs-extra";
import yaml from "js-yaml";

export class SetupYarn {
    async execute() {
        const yarnVersion = "4.6.0";
        const yarnFile = `yarn-${yarnVersion}.cjs`;
        const yarnPath = `.yarn`;
        const yarnReleasesPath = path.join(yarnPath, "releases");
        const yarnReleasesFilePath = path.join(yarnReleasesPath, yarnFile);

        /**
         * We do not want to do the recursive directory creating as it might do something in parent directories which we do not want.
         */
        const yarnReleaseFullPath = path.join(projectRootPath, yarnReleasesPath);
        fs.ensureDirSync(yarnReleaseFullPath);

        const source = path.join(import.meta.dirname, "SetupYarn", path.join("binaries", yarnFile));
        if (!fs.existsSync(source)) {
            throw new Error(`No yarn binary source file: ${source}`);
        }

        const target = path.join(projectRootPath, yarnReleasesFilePath);
        fs.copyFileSync(source, target);

        // `.yarnrc.yml` file is created here.
        const yarnRcPath = path.join(projectRootPath, ".yarnrc.yml");

        let rawYarnRc = `yarnPath: ${yarnReleasesFilePath}`;
        if (fs.existsSync(yarnRcPath)) {
            rawYarnRc = fs.readFileSync(yarnRcPath, "utf-8");
        }

        const parsedYarnRc = yaml.load(rawYarnRc);

        // Default settings are applied here. Currently, we only apply the `nodeLinker` param.
        parsedYarnRc.nodeLinker = "node-modules";

        // Enables adding additional params into the `.yarnrc.yml` file.
        if (assignToYarnRc) {
            let parsedAssignToYarnRc;
            try {
                parsedAssignToYarnRc = JSON.parse(assignToYarnRc);
            } catch {
                console.log(yellow("Warning: could not parse provided --assign-to-yarnrc JSON."));
            }

            if (parsedAssignToYarnRc) {
                Object.assign(parsedYarnRc, parsedAssignToYarnRc);
            }
        }

        fs.writeFileSync(yarnRcPath, yaml.dump(parsedYarnRc));
    }
}

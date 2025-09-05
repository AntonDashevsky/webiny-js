import findUp from "find-up";
import loadJsonFile from "load-json-file";

export class GetCwpVersion {
    execute() {
        const cwpPackageJsonPath = findUp.sync("package.json", {
            cwd: import.meta.dirname
        });
        const cwpPackageJson = loadJsonFile.sync(cwpPackageJsonPath);
        return cwpPackageJson.version;
    }
}

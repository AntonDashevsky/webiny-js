import readJson from "read-json-sync";
import findUp from "find-up";

export class PackageJson {
    static async fromFile(filePath) {
        return new PackageJson(filePath, readJson(filePath));
    }

    static async findClosest(fromPath) {
        const closestPackageJson = await findUp("package.json", { cwd: fromPath });
        return PackageJson.fromFile(closestPackageJson);
    }

    constructor(filePath, json) {
        this.filePath = filePath;
        this.json = json;
    }

    getLocation() {
        return this.filePath;
    }

    getJson() {
        return this.json;
    }
}

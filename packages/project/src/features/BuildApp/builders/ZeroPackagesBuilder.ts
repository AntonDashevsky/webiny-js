import { BasePackagesBuilder } from "./BasePackagesBuilder.js";

export class ZeroPackagesBuilder extends BasePackagesBuilder {
    public override build() {
        // Simply don't do anything. There are no packages to build.
        this.logger.info(`No packages to build.`);
        return []
    }
}

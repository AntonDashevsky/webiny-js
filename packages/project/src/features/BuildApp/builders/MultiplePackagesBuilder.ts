import { BasePackagesBuilder } from "./BasePackagesBuilder.js";
import { RunnableBuildProcess } from "./RunnableBuildProcess.js";
import { RunnableBuildProcessCollection } from "./RunnableBuildProcessCollection.js";

export class MultiplePackagesBuilder extends BasePackagesBuilder {
    public override build() {
        const packages = this.packages;
        this.logger.debug(`Building %s packages...`, packages.length);
        this.logger.debug("The following packages will be built for changes:", packages);

        return new RunnableBuildProcessCollection(
            packages.map(pkg => {
                return new RunnableBuildProcess({
                    buildParams: this.params,
                    pkg
                });
            })
        );
    }
}

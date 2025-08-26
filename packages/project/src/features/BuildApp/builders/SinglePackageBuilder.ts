import { BasePackagesBuilder } from "./BasePackagesBuilder.js";
import { RunnableBuildProcess } from "./RunnableBuildProcess.js";
import { RunnableBuildProcessCollection } from "./RunnableBuildProcessCollection.js";

export class SinglePackageBuilder extends BasePackagesBuilder {
    public override build() {
        const [pkg] = this.packages;

        return new RunnableBuildProcessCollection([
            new RunnableBuildProcess({
                buildParams: this.params,
                pkg
            })
        ]);
    }
}

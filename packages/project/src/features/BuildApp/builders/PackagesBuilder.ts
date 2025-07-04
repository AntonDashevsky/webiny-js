import { BasePackagesBuilder } from "./BasePackagesBuilder.js";
import { ZeroPackagesBuilder } from "./ZeroPackagesBuilder.js";
import { SinglePackageBuilder } from "./SinglePackageBuilder.js";
import { MultiplePackagesBuilder } from "./MultiplePackagesBuilder.js";

export class PackagesBuilder extends BasePackagesBuilder {
    public override build() {
        const BuilderClass = this.getBuilderClass();

        const builder = new BuilderClass({
            packages: this.packages,
            params: this.params,
            logger: this.logger
        });

        return builder.build();
    }

    private getBuilderClass() {
        const packagesCount = this.packages.length;
        if (packagesCount === 0) {
            return ZeroPackagesBuilder;
        }

        if (packagesCount === 1) {
            return SinglePackageBuilder;
        }
        return MultiplePackagesBuilder;
    }
}

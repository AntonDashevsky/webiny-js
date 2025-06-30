import { BasePackagesBuilder } from "./BasePackagesBuilder.js";
import { ZeroPackagesBuilder } from "./ZeroPackagesBuilder.js";
import { SinglePackageBuilder } from "./SinglePackageBuilder.js";
import { MultiplePackagesBuilder } from "./MultiplePackagesBuilder.js";

export class PackagesBuilder extends BasePackagesBuilder {
    public override async build(): Promise<void> {
        const BuilderClass = this.getBuilderClass();

        const builder = new BuilderClass(this.packages, this.buildParams, this.logger);

        await builder.build();
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

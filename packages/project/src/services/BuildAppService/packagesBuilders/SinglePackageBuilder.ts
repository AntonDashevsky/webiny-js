import chalk from "chalk";
import { BasePackagesBuilder } from "./BasePackagesBuilder.js";
import { type IRequireConfigOptions, requireConfigWithExecute } from "./utils/requireConfig.js";

export class SinglePackageBuilder extends BasePackagesBuilder {
    public override async build() {
        const pkg = this.packages[0];
        const logger = this.logger;
        const buildParams = this.buildParams;

        const { env, variant, region } = buildParams;

        const pkgName = pkg.name;
        const pkgRelativePath = chalk.gray(`(${pkg.paths.packageFolder})`);
        logger.info(`Building %s package...`, `${pkgName} ${pkgRelativePath}`);

        const options: IRequireConfigOptions = {
            env,
            variant,
            region,
            // debug, TODO: check this
            cwd: pkg.paths.packageFolder,
        };

        const config = await requireConfigWithExecute(pkg.paths.webinyConfigFile, {
            options,
            context: {}
        });

        const hasBuild = config.commands && typeof config.commands.build === "function";
        if (!hasBuild) {
            throw new Error("Build command not found.");
        }

        await config.commands.build(options);
    }
}

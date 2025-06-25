import chalk from "chalk";
import { BasePackagesBuilder } from "./BasePackagesBuilder.js";
import { type IRequireConfigOptions, requireConfigWithExecute } from "./utils/requireConfig.js";

export class SinglePackageBuilder extends BasePackagesBuilder {
    public override async build() {
        const pkg = this.packages[0];
        const logger = this.logger;
        const buildParams = this.buildParams;

        const { env, debug, variant, region } = buildParams;

        const pkgName = pkg.name;
        const pkgRelativePath = chalk.gray(`(${pkg.paths.packageFolder})`);
        logger.info(`Building %s package...`, `${pkgName} ${pkgRelativePath}`);

        const options: IRequireConfigOptions = {
            env,
            variant,
            region,
            debug,
            cwd: pkg.paths.packageFolder,
        };

        const config = await requireConfigWithExecute(pkg.paths.webinyConfigFile, {
            options,
            context: {}
        });

        const hasBuildCommand = config.commands && typeof config.commands.build === "function";
        if (!hasBuildCommand) {
            throw new Error("Build command not found.");
        }

        await config.commands.build(options);
    }
}

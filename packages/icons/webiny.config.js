const { createWatchPackage, createBuildPackage } = require("@webiny/project-utils");

module.exports = {
    commands: {
        build: async options => {
            // Copy all icons from `@material-design-icons/svg/outlined` folder to `dist` folder.
            // We're doing this because simply re-exporting icons from `@material-ui/icons` package
            // was not possible.
            const fs = require("fs");
            const path = require("path");

            const pkgDirPath = path.dirname(
                require.resolve("@material-design-icons/svg/package.json")
            );
            const outlinedIconsDirPath = path.resolve(pkgDirPath, "outlined");
            const srcDir = path.resolve(__dirname, "src");
            const destDir = path.resolve(__dirname, "dist");

            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }

            fs.readdirSync(outlinedIconsDirPath).forEach(file => {
                const sourceFile = path.join(outlinedIconsDirPath, file);
                const destFile = path.join(destDir, file);
                const srcFile = path.join(srcDir, file);
                fs.copyFileSync(sourceFile, srcFile);
                fs.copyFileSync(sourceFile, destFile);
            });

            const buildPackages = createBuildPackage({ cwd: __dirname });
            return buildPackages(options);
        },
        watch: createWatchPackage({ cwd: __dirname })
    }
};

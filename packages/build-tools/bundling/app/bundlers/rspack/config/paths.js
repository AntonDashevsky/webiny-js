import path from "path";
import fs from "fs";

const envPublicUrl = process.env.PUBLIC_URL;

const moduleFileExtensions = [
    "web.mjs",
    "mjs",
    "cjs",
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx"
];

const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

const createPaths = ({ appIndexJs, cwd }) => {
    const appDirectory = fs.realpathSync(cwd);
    const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

    return {
        appPath: resolveApp("."),
        appBuild: resolveApp("build"),
        appPublic: resolveApp("public"),
        appHtml: resolveApp("public/index.html"),
        appIndexJs: appIndexJs,
        appSrc: resolveApp("src"),
        appTsConfig: resolveApp("tsconfig.json"),
        appJsConfig: resolveApp("jsconfig.json"),
        yarnLockFile: resolveApp("yarn.lock"),
        testsSetup: resolveModule(resolveApp, "src/setupTests"),
        proxySetup: resolveApp("src/setupProxy.js"),
        appNodeModules: resolveApp("node_modules"),
        publicUrl: envPublicUrl,
        moduleFileExtensions
    };
};

export default createPaths;

import path from "path";
import fs from "fs";
import url from "url";
import { allWorkspaces } from "../../../../../workspaces/index.js";

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
    const hasSlash = inputPath.endsWith("/");
    if (hasSlash && !needsSlash) {
        return inputPath.slice(0, -1);
    } else if (!hasSlash && needsSlash) {
        return `${inputPath}/`;
    } else {
        return inputPath;
    }
}

function getServedPath() {
    const publicUrl = envPublicUrl;
    const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
    return ensureSlash(servedUrl, true);
}

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
        servedPath: getServedPath(resolveApp("package.json")),
        allWorkspaces: allWorkspaces(),
        moduleFileExtensions
    };
};

export default createPaths;

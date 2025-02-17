import * as fs from "fs";
import * as path from "path";
import { Project, type SourceFile } from "ts-morph";
import findUp from "find-up";
import { getFilesUsingGlob } from "./getFilesUsingGlob.js";
import { PackageJson } from "./PackageJson.js";

// Function to check if a path is a directory
const isDirectory = (filePath: string): boolean => {
    return fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory();
};

const extensions = [".ts", ".tsx", ".js"];

// Function to check if a path can resolve to a file.
const detectFile = (importPath: string, absolutePath: string): string | undefined => {
    if (fs.existsSync(absolutePath) && fs.lstatSync(absolutePath).isFile()) {
        return importPath;
    }

    for (const ext of extensions) {
        if (fs.existsSync(`${absolutePath}${ext}`)) {
            return `${importPath}.js`;
        }
    }

    return undefined;
};

class ImportSpecifier {
    private readonly packageName: string;
    private readonly subPath: string;

    constructor(packageName: string, subPath: string) {
        this.packageName = packageName;
        this.subPath = subPath;
    }

    static parse(specifier: string) {
        const parts = specifier.split("/");
        if (specifier.startsWith("@")) {
            const packageName = parts.slice(0, 2).join("/");
            const subPath = parts.slice(2).join("/");

            return new ImportSpecifier(packageName, subPath);
        }

        return new ImportSpecifier(parts[0], parts.slice(1).join("/"));
    }

    getPackageName() {
        return this.packageName;
    }

    getSubPath() {
        return this.subPath;
    }
}

class LocalImportPath {
    private sourceFile: SourceFile;
    private readonly sourceRoot: string;

    constructor(sourceFile: SourceFile, sourceRoot: string) {
        this.sourceFile = sourceFile;
        this.sourceRoot = sourceRoot;
    }

    resolve(importPath: string) {
        const absImportRequest = importPath.startsWith("~/")
            ? path.join(this.sourceRoot, importPath.replace("~/", ""))
            : path.resolve(path.dirname(this.sourceFile.getFilePath()), importPath);

        const detectedFile = detectFile(importPath, absImportRequest);
        if (detectedFile) {
            return detectedFile;
        }

        if (isDirectory(absImportRequest)) {
            // Ensure directory imports use "index.js"
            return importPath + "/index.js";
        }

        // Ensure module imports use ".js"
        return importPath + ".js";
    }
}

class PackageImportPath {
    private sourceFile: SourceFile;
    private whitelist = ["react-virtualized", "react-transition-group"];

    constructor(sourceFile: SourceFile) {
        this.sourceFile = sourceFile;
    }

    async resolve(importPath: string) {
        const importSpecifier = ImportSpecifier.parse(importPath);
        const packageName = importSpecifier.getPackageName();
        const subPath = importSpecifier.getSubPath();

        if (
            !subPath ||
            packageName.startsWith("node:") ||
            packageName.startsWith("!!") ||
            this.whitelist.includes(packageName)
        ) {
            return importPath;
        }

        const resolvedPath = this.resolvePackagePath(importSpecifier.getPackageName());

        if (!resolvedPath) {
            throw Error(`Unable to resolve "${importPath}"!`);
        }

        const packageJson = await PackageJson.fromFile(`${resolvedPath}/package.json`);

        const exports = packageJson.getJson().exports;

        // If sub path is defined in `exports`, we leave it as-is.
        if (exports?.hasOwnProperty(`./${importSpecifier.getSubPath()}`)) {
            return importPath;
        }

        const absolutePath = `${resolvedPath}/${importSpecifier.getSubPath()}`;

        const detectedFile = detectFile(importPath, absolutePath);
        if (detectedFile) {
            return detectedFile;
        }

        if (isDirectory(absolutePath)) {
            if (importSpecifier.getSubPath() === "") {
                return importPath;
            }

            // Ensure directory imports use "index.js"
            return importPath + "/index.js";
        }

        // Ensure subpath file imports use ".js"
        return importPath + ".js";
    }

    private resolvePackagePath(packageName: string) {
        const resolvedPath = findUp.sync(`node_modules/${packageName}`, {
            cwd: path.dirname(this.sourceFile.getFilePath()),
            type: "directory"
        });

        return resolvedPath;
    }
}

async function updateImports(sourceFile: SourceFile, sourceRoot: string) {
    const localPath = new LocalImportPath(sourceFile, sourceRoot);
    const packagePath = new PackageImportPath(sourceFile);

    const importDeclarations = [
        ...sourceFile.getImportDeclarations(),
        ...sourceFile.getExportDeclarations()
    ];

    for (const declaration of importDeclarations) {
        const importPath = declaration.getModuleSpecifierValue();

        if (!importPath) {
            continue;
        }

        if (importPath.endsWith(".js.js")) {
            declaration.setModuleSpecifier(importPath.replace(".js.js", ".js"));
            continue;
        }

        if (importPath.endsWith(".js")) {
            continue;
        }

        if (
            importPath.startsWith("../") ||
            importPath.startsWith("./") ||
            importPath.startsWith("~/")
        ) {
            declaration.setModuleSpecifier(localPath.resolve(importPath));
        } else {
            declaration.setModuleSpecifier(await packagePath.resolve(importPath));
        }
    }
}

/**
 * Main function to process all files in the root directory
 */
export async function cjsToEsm(rootDir: string) {
    const project = new Project();

    // Get all .js, .ts, and .tsx files in the directory using glob
    const files = getFilesUsingGlob(rootDir).sort();

    // Add each file to the ts-morph project and process it
    for (const filePath of files) {
        const sourceFile = project.addSourceFileAtPath(filePath);
        const closestPackageJson = findUp.sync("package.json", {
            cwd: path.dirname(filePath)
        })!;

        const packageRoot = path.dirname(closestPackageJson);
        const hasSrcDir = fs.existsSync(packageRoot + "/src");
        const sourceRoot = [packageRoot, hasSrcDir ? "src" : undefined].filter(Boolean).join("/");

        try {
            await updateImports(sourceFile, sourceRoot);
        } catch (err) {
            console.error("Error transforming file", filePath);
            console.error(err);
            process.exit(1);
        }
    }

    // Save all the changes
    project.saveSync();
}

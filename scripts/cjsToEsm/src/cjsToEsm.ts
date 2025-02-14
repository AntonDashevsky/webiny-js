import { Project, SourceFile } from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import { getFilesUsingGlob } from "./getFilesUsingGlob";

// Function to check if a path is a directory
const isDirectory = (filePath: string): boolean => {
    return fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory();
};

// Function to check if a file exists
const isFile = (filePath: string): boolean => {
    return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
};

// Function to resolve a package subpath (returns actual path or null if not found)
const resolvePackagePath = (importPath: string): string | null => {
    try {
        return require.resolve(importPath, { paths: [process.cwd()] });
    } catch {
        return null;
    }
};

function updateImports(sourceFile: SourceFile) {
    let modified = false;

    sourceFile.getImportDeclarations().forEach(importDeclaration => {
        let importPath = importDeclaration.getModuleSpecifierValue();

        if (importPath.startsWith(".")) {
            // Handle local imports (relative paths)
            let importFullPath = path.resolve(path.dirname(sourceFile.getFilePath()), importPath);

            if (isDirectory(importFullPath)) {
                // Ensure directory imports use "index.js"
                importPath = importPath.replace(/\/?$/, "/index.js");
                modified = true;
            } else if (!importPath.endsWith(".js") && !importPath.endsWith(".ts")) {
                // Ensure module imports use ".js"
                importPath += ".js";
                modified = true;
            }
        } else if (importPath.includes("/")) {
            // Handle package subpath imports (e.g., "lodash/get", "@webiny/handler/utils")
            const resolvedPath = resolvePackagePath(importPath);

            if (resolvedPath) {
                if (isDirectory(resolvedPath)) {
                    // Ensure directory imports use "index.js"
                    importPath = importPath.replace(/\/?$/, "/index.js");
                    modified = true;
                } else if (isFile(resolvedPath) && !importPath.endsWith(".js")) {
                    // Ensure subpath file imports use ".js"
                    importPath += ".js";
                    modified = true;
                }
            }
        }

        // Update import statement if modified
        if (modified) {
            importDeclaration.setModuleSpecifier(importPath);
        }
    });
}

/**
 * Main function to process all files in the root directory
 */
export function cjsToEsm(rootDir: string) {
    const project = new Project();

    // Get all .js, .ts, and .tsx files in the directory using glob
    const files = getFilesUsingGlob(rootDir);

    // Add each file to the ts-morph project and process it
    files.forEach(filePath => {
        const sourceFile = project.addSourceFileAtPath(filePath);
        try {
            updateImports(sourceFile);
        } catch (err) {
            console.error("Error transforming file", filePath);
            console.error(err);
            process.exit(1);
        }
    });

    // Save all the changes
    project.saveSync();
}

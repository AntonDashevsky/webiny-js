import * as glob from "glob";

/**
 * Get all .js, .ts, and .tsx files using glob
 */
export function getFilesUsingGlob(
    rootDir: string,
    patterns: string[] = ["**/*.js", "**/*.ts", "**/*.tsx"]
): string[] {
    const matchedFiles: string[] = [];

    // Use `glob` to pattern match files
    glob.sync(patterns, {
        cwd: rootDir,
        nodir: true,
        absolute: true,
        ignore: ["node_modules/**", "**/*.d.ts", "**/jest.config.js", "**/babelrc.js", "**/dist/**"]
    }).forEach(file => {
        matchedFiles.push(file);
    });

    return matchedFiles;
}

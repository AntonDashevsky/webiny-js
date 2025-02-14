import { Project, SyntaxKind, SourceFile } from "ts-morph";
import { getFilesUsingGlob } from "./getFilesUsingGlob";

function transformSourceFile(sourceFile: SourceFile) {
    // Collect all the export names and their corresponding function definitions
    const exportAssignments: string[] = [];

    sourceFile.getStatements().forEach(statement => {
        if (statement.getKind() === SyntaxKind.ExpressionStatement) {
            const expression = statement
                .asKindOrThrow(SyntaxKind.ExpressionStatement)
                .getExpression();

            if (expression.getKind() === SyntaxKind.BinaryExpression) {
                const binaryExpression = expression.asKindOrThrow(SyntaxKind.BinaryExpression);
                const leftSide = binaryExpression.getLeft().getText();

                // Check if it is `module.exports.something`
                if (leftSide.startsWith("module.exports.")) {
                    const exportName = leftSide.replace("module.exports.", "");

                    // Get the right side (function definition)
                    const rightSide = binaryExpression.getRight().getText();

                    // Replace `module.exports.something = function () {}` with `const something = function () {}`
                    const newVarDeclaration = `const ${exportName} = ${rightSide};`;
                    sourceFile.insertStatements(statement.getChildIndex(), newVarDeclaration);

                    // Collect the export name for the final `module.exports` statement
                    exportAssignments.push(exportName);

                    // Remove the old individual `module.exports` assignment
                    statement.remove();
                }
            }
        }
    });

    // If there are collected exports, create a new `module.exports = { ... }` statement
    if (exportAssignments.length > 0) {
        const exportsObject = `{ ${exportAssignments.join(", ")} }`;
        const moduleExportsStatement = `module.exports = ${exportsObject};`;

        // Insert the new statement at the end of the file (or any other suitable location)
        sourceFile.addStatements(moduleExportsStatement);
    }
}

export function fixProject(rootDir: string) {
    const project = new Project();

    // Get all .js, .ts, and .tsx files in the directory using glob
    const files = getFilesUsingGlob(rootDir);

    // Add each file to the ts-morph project and process it
    files.forEach(filePath => {
        const sourceFile = project.addSourceFileAtPath(filePath);
        try {
            transformSourceFile(sourceFile);
        } catch (err) {
            console.error("Error transforming file", filePath);
            console.error(err);
            process.exit(1);
        }
    });

    // Save all the changes
    project.saveSync();
}

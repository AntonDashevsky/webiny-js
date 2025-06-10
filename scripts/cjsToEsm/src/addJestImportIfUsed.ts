import { SourceFile, SyntaxKind } from "ts-morph";

export function addJestImportIfUsed(sourceFile: SourceFile) {
    const filePath = sourceFile.getFilePath();

    // Check if this is a test file (basic check for .test or .spec)
    const isTestFile = /\.(test|spec)\.(ts|tsx|js|jsx)$/.test(filePath);
    if (!isTestFile) {
        return;
    }

    const fileText = sourceFile.getFullText();

    // Quick text check for jest usage
    if (!/\bjest\b/.test(fileText)) {
        return;
    }

    // Check if 'import { jest } from "@jest/globals"' already exists
    const existingImport = sourceFile.getImportDeclarations().some(imp => {
        return (
            imp.getModuleSpecifierValue() === "@jest/globals" &&
            imp.getNamedImports().some(named => named.getName() === "jest")
        );
    });

    if (!existingImport) {
        // Add the import at the top
        sourceFile.addImportDeclaration({
            namedImports: ["jest"],
            moduleSpecifier: "@jest/globals"
        });
    }
}

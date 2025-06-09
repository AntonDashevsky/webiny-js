import {
    type SourceFile,
    SyntaxKind,
    ImportSpecifier,
    ExportSpecifier,
    Node,
    Symbol as MorphSymbol
} from "ts-morph";

const symbolTypeCache = new WeakMap<MorphSymbol, boolean>();

export async function convertTypeOnlyImports(sourceFile: SourceFile): Promise<void> {
    const importDeclarations = sourceFile.getImportDeclarations();
    const exportDeclarations = sourceFile.getExportDeclarations();

    for (const importDecl of importDeclarations) {
        if (importDecl.isTypeOnly()) {
            continue;
        }

        const namedImports = importDecl.getNamedImports();
        if (namedImports.length === 0) {
            continue;
        }

        const typeOnlyImports: ImportSpecifier[] = [];
        const valueOnlyImports: ImportSpecifier[] = [];

        for (const namedImport of namedImports) {
            const symbol = getAliasedSymbolSafe(namedImport.getNameNode());
            if (!symbol) {
                valueOnlyImports.push(namedImport);
                continue;
            }

            let isType = symbolTypeCache.get(symbol);
            if (isType === undefined) {
                const declarations = symbol.getDeclarations();
                isType = declarations.every((decl) => isTypeDeclaration(decl));
                symbolTypeCache.set(symbol, isType);
            }

            if (isType) {
                typeOnlyImports.push(namedImport);
            } else {
                valueOnlyImports.push(namedImport);
            }
        }

        if (typeOnlyImports.length === 0) {
            continue;
        }

        const moduleSpecifier = importDecl.getModuleSpecifierValue();
        const childIndex = importDecl.getChildIndex();
        const typeImportTexts = typeOnlyImports.map((spec) => getSpecifierText(spec));
        const valueImportTexts = valueOnlyImports.map((spec) => getSpecifierText(spec));

        importDecl.remove();

        if (valueImportTexts.length > 0) {
            sourceFile.insertImportDeclaration(childIndex, {
                moduleSpecifier,
                namedImports: valueImportTexts,
                isTypeOnly: false
            });
        }

        sourceFile.insertImportDeclaration(childIndex, {
            moduleSpecifier,
            namedImports: typeImportTexts,
            isTypeOnly: true
        });
    }

    for (const exportDecl of exportDeclarations) {
        if (exportDecl.isTypeOnly()) {
            continue;
        }

        const namedExports = exportDecl.getNamedExports();
        if (namedExports.length === 0) {
            continue;
        }

        const allAlreadyCorrect = namedExports.every((spec) => {
            const isExplicitType = spec.getText().startsWith("type ");
            const symbol = getAliasedSymbolSafe(spec.getNameNode());
            if (!symbol) {
                return !isExplicitType;
            }

            let isType = symbolTypeCache.get(symbol);
            if (isType === undefined) {
                const declarations = symbol.getDeclarations();
                isType = declarations.every((decl) => isTypeDeclaration(decl));
                symbolTypeCache.set(symbol, isType);
            }

            return isType === isExplicitType;
        });

        if (allAlreadyCorrect) {
            continue;
        }

        const typeOnlyExports: ExportSpecifier[] = [];
        const valueOnlyExports: ExportSpecifier[] = [];

        for (const exportSpec of namedExports) {
            const symbol = getAliasedSymbolSafe(exportSpec.getNameNode());
            if (!symbol) {
                valueOnlyExports.push(exportSpec);
                continue;
            }

            let isType = symbolTypeCache.get(symbol);
            if (isType === undefined) {
                const declarations = symbol.getDeclarations();
                isType = declarations.every((decl) => isTypeDeclaration(decl));
                symbolTypeCache.set(symbol, isType);
            }

            if (isType) {
                typeOnlyExports.push(exportSpec);
            } else {
                valueOnlyExports.push(exportSpec);
            }
        }

        if (typeOnlyExports.length === 0) {
            continue;
        }

        const moduleSpecifier = exportDecl.getModuleSpecifierValue();
        const childIndex = exportDecl.getChildIndex();
        const typeExportTexts = typeOnlyExports.map((spec) => getSpecifierText(spec));
        const valueExportTexts = valueOnlyExports.map((spec) => getSpecifierText(spec));

        exportDecl.remove();

        if (valueExportTexts.length > 0) {
            sourceFile.insertExportDeclaration(childIndex, {
                moduleSpecifier,
                namedExports: valueExportTexts,
                isTypeOnly: false
            });
        }

        sourceFile.insertExportDeclaration(childIndex, {
            moduleSpecifier,
            namedExports: typeExportTexts,
            isTypeOnly: true
        });
    }
}

function getAliasedSymbolSafe(node: Node): MorphSymbol | undefined {
    try {
        const symbol = node.getSymbol();
        return symbol?.getAliasedSymbol() ?? symbol;
    } catch {
        return undefined;
    }
}

function isTypeDeclaration(decl: Node): boolean {
    const kind = decl.getKind();
    return (
        kind === SyntaxKind.InterfaceDeclaration ||
        kind === SyntaxKind.TypeAliasDeclaration ||
        kind === SyntaxKind.TypeParameter ||
        kind === SyntaxKind.TypeLiteral ||
        (kind === SyntaxKind.EnumDeclaration &&
            decl.getFirstChildByKind(SyntaxKind.ConstKeyword) !== undefined)
    );
}

function getSpecifierText(spec: ImportSpecifier | ExportSpecifier): string {
    const alias = spec.getAliasNode();
    const name = spec.getName();
    return alias ? `${name} as ${alias.getText()}` : name;
}

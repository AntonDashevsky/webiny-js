import { type SourceFile, SyntaxKind, ImportSpecifier, ExportSpecifier, Node } from "ts-morph";

export async function convertTypeOnlyImports(sourceFile: SourceFile): Promise<void> {
    const typeUsageKinds = new Set([
        SyntaxKind.TypeReference,
        SyntaxKind.TypeAliasDeclaration,
        SyntaxKind.InterfaceDeclaration,
        SyntaxKind.HeritageClause,
        SyntaxKind.Parameter,
        SyntaxKind.TypeParameter,
        SyntaxKind.TypeLiteral,
        SyntaxKind.PropertySignature,
        SyntaxKind.AsExpression,
        SyntaxKind.TypeAssertionExpression
    ]);

    const languageService = sourceFile.getProject().getLanguageService();

    // ----------------------------
    // Convert Import Declarations
    // ----------------------------
    const importDeclarations = sourceFile.getImportDeclarations();

    for (const importDecl of importDeclarations) {
        if (importDecl.isTypeOnly()) {
            continue;
        }

        const namedImports = importDecl.getNamedImports();
        if (namedImports.length === 0) {
            continue;
        }

        const typeOnlyImports: ImportSpecifier[] = [];

        for (const namedImport of namedImports) {
            const nameNode = namedImport.getNameNode();
            const importName = nameNode.getText();

            const references = languageService.findReferencesAsNodes(nameNode).filter(ref => {
                return ref.getSourceFile().getFilePath() === sourceFile.getFilePath();
            });

            const externalUsages = references.filter(ref => {
                const parent = ref.getParent();
                return parent && parent.getKind() !== SyntaxKind.ImportSpecifier;
            });

            if (
                externalUsages.length > 0 &&
                externalUsages.every(ref => {
                    const parent = ref.getParent();
                    return parent && typeUsageKinds.has(parent.getKind());
                })
            ) {
                typeOnlyImports.push(namedImport);
            }
        }

        if (typeOnlyImports.length === 0) {
            continue;
        }

        if (typeOnlyImports.length === namedImports.length) {
            importDecl.setIsTypeOnly(true);
        } else {
            const valueImportTexts = namedImports
                .filter(i => {
                    return !typeOnlyImports.includes(i);
                })
                .map(i => {
                    return i.getText();
                });

            const typeImportTexts = typeOnlyImports.map(i => {
                return i.getText();
            });

            importDecl.getNamedImports().forEach(i => {
                i.remove();
            });

            if (valueImportTexts.length > 0) {
                importDecl.addNamedImports(valueImportTexts);
            }

            sourceFile.insertImportDeclaration(importDecl.getChildIndex(), {
                moduleSpecifier: importDecl.getModuleSpecifierValue(),
                namedImports: typeImportTexts,
                isTypeOnly: true
            });
        }
    }

    // ----------------------------
    // Convert Export Declarations
    // ----------------------------
    const exportDeclarations = sourceFile.getExportDeclarations();

    for (const exportDecl of exportDeclarations) {
        if (exportDecl.isTypeOnly()) {
            continue;
        }

        const namedExports = exportDecl.getNamedExports();
        if (namedExports.length === 0) {
            continue;
        }

        const typeOnlyExports: ExportSpecifier[] = [];

        for (const exportSpec of namedExports) {
            const nameNode = exportSpec.getNameNode();
            const exportName = nameNode.getText();

            const references = languageService.findReferencesAsNodes(nameNode).filter(ref => {
                return ref.getSourceFile().getFilePath() === sourceFile.getFilePath();
            });

            const externalUsages = references.filter(ref => {
                const parent = ref.getParent();
                return parent && parent.getKind() !== SyntaxKind.ExportSpecifier;
            });

            let treatAsType = false;

            if (externalUsages.length === 0) {
                const symbol = nameNode.getSymbol();
                const aliasedSymbol = symbol?.getAliasedSymbol();
                const declarations = aliasedSymbol?.getDeclarations() ?? [];

                if (declarations.length > 0) {
                    treatAsType = declarations.every(decl => {
                        return isTypeDeclaration(decl);
                    });
                }
            } else {
                treatAsType = externalUsages.every(ref => {
                    const parent = ref.getParent();
                    return parent && typeUsageKinds.has(parent.getKind());
                });
            }

            if (treatAsType) {
                typeOnlyExports.push(exportSpec);
            }
        }

        if (typeOnlyExports.length === 0) {
            continue;
        }

        const valueExports = namedExports.filter(e => {
            return !typeOnlyExports.includes(e);
        });

        const valueExportTexts = valueExports.map(e => {
            return e.getText();
        });

        const typeExportTexts = typeOnlyExports.map(e => {
            return e.getText();
        });

        namedExports.forEach(e => {
            e.remove();
        });

        if (valueExportTexts.length > 0) {
            exportDecl.addNamedExports(valueExportTexts);
        }

        sourceFile.insertExportDeclaration(exportDecl.getChildIndex(), {
            moduleSpecifier: exportDecl.getModuleSpecifierValue(),
            namedExports: typeExportTexts,
            isTypeOnly: true
        });
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

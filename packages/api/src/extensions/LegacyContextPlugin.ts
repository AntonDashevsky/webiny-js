import { defineExtension, zodPathToFile } from "@webiny/project/extensions/index.js";
import { z } from "zod";
import path from "path";
import Case from "case";
import { type ArrayLiteralExpression, Node, Project } from "ts-morph";

export const legacyContextPlugin = defineExtension({
    type: "API/LegacyContextPlugin",
    tags: { runtimeContext: "app-build", appName: "api" },
    description: "Legacy context plugin, used with Webiny v5. Exists for backward compatibility.",
    multiple: true,
    paramsSchema: ({ project }) => {
        return z.object({
            src: zodPathToFile(project)
        });
    },
    async build(params, ctx) {
        const extensionsFilePath = ctx.project.paths.workspacesFolder
            .join("apps", "api", "graphql", "src", "extensions.ts")
            .toString();

        const extensionFactory = Case.pascal("Something" + Date.now()) + "ExtensionFactory";
        const importName = "{ createExtension as " + extensionFactory + " }";

        const srcWithoutExt = params.src.replace(/\.[^/.]+$/, "");

        const project = new Project();

        project.addSourceFileAtPath(extensionsFilePath);

        const source = project.getSourceFileOrThrow(extensionsFilePath);

        const importPath = path.join(
            path.relative(
                path.dirname(extensionsFilePath),
                ctx.project.paths.rootFolder.toString()
            ),
            srcWithoutExt
        );

        const existingImportDeclaration = source.getImportDeclaration(importPath);
        if (existingImportDeclaration) {
            return;
        }

        let index = 1;

        const importDeclarations = source.getImportDeclarations();
        if (importDeclarations.length) {
            const last = importDeclarations[importDeclarations.length - 1];
            index = last.getChildIndex() + 1;
        }

        source.insertImportDeclaration(index, {
            defaultImport: importName,
            moduleSpecifier: importPath
        });

        const pluginsArray = source.getFirstDescendant(node =>
            Node.isArrayLiteralExpression(node)
        ) as ArrayLiteralExpression;

        pluginsArray.addElement(`${extensionFactory}()`);

        await source.save();
    }
});

import { createImplementation } from "@webiny/di-container";
import { GetProjectService, SetProjectIdService } from "~/abstractions/index.js";
import { Project, SyntaxKind } from "ts-morph";

class DefaultSetProjectIdService implements SetProjectIdService.Interface {
    constructor(private getProjectService: GetProjectService.Interface) {}

    async execute(id: string) {
        const project = this.getProjectService.execute();
        const webinyConfigFileTsx = project.paths.webinyConfigFile.toString();

        const tsMorphProject = new Project();
        const sourceFile = tsMorphProject.addSourceFileAtPath(webinyConfigFileTsx);

        // Find <Webiny />
        const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
        const webinyEl = jsxElements.find(el => el.getTagNameNode().getText() === "Webiny");
        if (!webinyEl) {
            throw new Error(`Could not find <Webiny /> in ${webinyConfigFileTsx}`);
        }

        // Check for <Project.Id />
        const hasProjectId = jsxElements.some(el => el.getTagNameNode().getText() === "Project.Id");
        if (hasProjectId) {
            throw new Error("Project.Id already exists in the file.");
        }

        // Insert after <Webiny />
        const insertPos = webinyEl.getEnd();
        sourceFile.insertText(insertPos, `\n            <Project.Id id={"${id}"} />`);

        await sourceFile.save();
    }
}

export const setProjectIdService = createImplementation({
    abstraction: SetProjectIdService,
    implementation: DefaultSetProjectIdService,
    dependencies: [GetProjectService]
});

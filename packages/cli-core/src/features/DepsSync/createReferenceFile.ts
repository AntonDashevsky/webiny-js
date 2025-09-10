import writeJsonFile from "write-json-file";
import { IProjectModel } from "@webiny/project";
import { UiService } from "~/abstractions/services/index.js";
import { getDuplicatesFilePath, getReferencesFilePath } from "./paths.js";
import type { IDependencyTree } from "./types.js";

export interface ICreateReferenceFileDi {
    uiService: UiService.Interface;
}

export const createReferenceFile = (
    project: IProjectModel,
    tree: IDependencyTree,
    di: ICreateReferenceFileDi
): void => {
    const refsFilePath = getReferencesFilePath(project);
    const dupesFilePath = getDuplicatesFilePath(project);

    const { uiService: ui } = di;
    if (tree.references.length === 0) {
        ui.info("No references found.");
        return;
    }

    ui.info(`Creating %s...`, refsFilePath);
    writeJsonFile.sync(
        refsFilePath,
        {
            dependencies: tree.dependencies,
            devDependencies: tree.devDependencies,
            peerDependencies: tree.peerDependencies,
            resolutions: tree.resolutions,
            references: tree.references
        },
        {
            indent: 0
        }
    );

    ui.info(`Creating %s...`, dupesFilePath);

    writeJsonFile.sync(dupesFilePath, tree.duplicates, {
        indent: 0
    });
};

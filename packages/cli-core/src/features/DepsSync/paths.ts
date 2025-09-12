import { IProjectModel } from "@webiny/project";

export const getReferencesFilePath = (project: IProjectModel) => {
    return project.paths.rootFolder.join("packages/cli/files/references.json").toString();
};

export const getDuplicatesFilePath = (project: IProjectModel) => {
    return project.paths.rootFolder.join("packages/cli/files/duplicates.json").toString();
};

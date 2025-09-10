import { IProjectModel } from "@webiny/project";

export const getReferencesFilePath = (project: IProjectModel) => {
    return project.paths.rootFolder.join(".depsSync.refs.json").toString();
};

export const getDuplicatesFilePath = (project: IProjectModel) => {
    return project.paths.rootFolder.join(".depsSync.dupes.json").toString();
};

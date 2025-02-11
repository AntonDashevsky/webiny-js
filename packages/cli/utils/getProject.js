import { Project } from "./Project.js";

let project;

export async function initializeProject() {
    project = await Project.load();

    return project;
}

export const getProject = () => {
    if (!project) {
        throw Error(
            `Project has not been initialized! Make sure you call "initializeProject" from "@webiny/cli"!`
        );
    }

    return project;
};

export default getProject;

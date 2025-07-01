import { createConfiguration } from "./configuration.js";
import { ProjectModel } from "~/models/index.js";

export interface IWithProjectNameParams {
    project: ProjectModel;
}

export const withProjectName = ({ project }: IWithProjectNameParams) => {
    return createConfiguration(() => {
        return {
            WEBINY_PROJECT_NAME: project.name,
        };
    });
};

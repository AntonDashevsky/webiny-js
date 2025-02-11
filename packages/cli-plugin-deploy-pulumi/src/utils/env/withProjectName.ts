import { createConfiguration } from "./configuration.js";
import type { Project } from "~/types.js";

export interface IWithProjectNameParams {
    project: Project;
}

export const withProjectName = ({ project }: IWithProjectNameParams) => {
    return createConfiguration(() => {
        return {
            WEBINY_PROJECT_NAME: project.name
        };
    });
};

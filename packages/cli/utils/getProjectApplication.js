import { getProject } from "./getProject.js";

/**
 * @deprecated Use `context.project.getApplication(cwd)` instead.
 */
export default ({ cwd }) => {
    const project = getProject();

    return project.getApplication(cwd);
};

import { createJob } from "./createJob.js";
import { NormalJob } from "github-actions-wac";

type CreateValidateWorkflowsJobParams = Partial<NormalJob>;

export const createValidateWorkflowsJob = (params: CreateValidateWorkflowsJobParams = {}) =>
    createJob({
        name: "Validate workflows",
        steps: [
            {
                name: "Install dependencies",
                run: "yarn --immutable"
            },
            {
                name: "Validate",
                run: "npx github-actions-wac validate"
            }
        ],
        ...params
    });

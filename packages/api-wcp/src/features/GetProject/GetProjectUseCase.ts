import { Result } from "@webiny/feature";
import type { WcpProject } from "~/types";
import type { GetProjectUseCase as UseCase } from "./abstractions";

export class GetProjectUseCase implements UseCase.Interface {
    constructor(private readonly getProject: () => WcpProject | null) {}

    async execute(): UseCase.Result {
        return Result.ok(this.getProject());
    }
}

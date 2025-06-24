import { Abstraction } from "@webiny/di-container";

interface IProjectInfoServiceResult {
    webiny: {
        debugEnabled: boolean;
        featureFlags: Record<string, boolean>;
    };
    wcp: {
        projectId: string;
        // user: wcpUser?.email || "N/A",
        usingProjectEnvironmentApiKey: boolean;
    };
    host: {
        os: string;
        nodeJs: string;
        npm: string;
        npx: string;
        yarn: string;
        isCI: boolean;
    };
    pulumi: {
        "@pulumi/pulumi": string;
        "@pulumi/aws": string;
        secretsProvider: string;
        usingPassword: boolean;
    };
}

interface IProjectInfoService {
    execute(): Promise<IProjectInfoServiceResult>;
}

export const ProjectInfoService = new Abstraction<IProjectInfoService>(
    "ProjectInfoService"
);

export namespace ProjectInfoService {
    export interface Interface extends IProjectInfoService {}
    export type Result = IProjectInfoServiceResult;
}
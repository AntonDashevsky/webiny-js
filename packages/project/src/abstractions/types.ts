export interface IBaseAppParams {
    app: AppName;
    env: string;
    variant?: string;
    region?: string;
}

export type AppName = "core" | "api" | "admin" | "website";
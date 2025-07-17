export type AppName = 'core' | 'api' | 'admin' | 'website';

export interface IBaseAppParams {
    app: AppName;
    env: string;
    variant?: string;
    region?: string;
}


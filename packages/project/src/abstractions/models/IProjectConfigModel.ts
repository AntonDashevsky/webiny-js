export interface IProjectConfigModel<TConfig extends Record<string, any> = Record<string, any>> {
    config: TConfig;
}

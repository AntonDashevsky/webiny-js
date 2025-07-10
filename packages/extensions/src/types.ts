export type IExtensionDefinitionModelDto<TParams extends Record<string, any> = Record<string, any>> =
    TParams & { __type: string };

export interface IExtensionDefinitionModel<TParams extends Record<string, any> = Record<string, any>> {
    type: string;
    params: Omit<IExtensionDefinitionModelDto<TParams>, "__type">;
    build?: () => Promise<void> | void;
    validate?: () => Promise<void> | void;
}

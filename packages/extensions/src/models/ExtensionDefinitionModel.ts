import { IExtensionDefinitionModel, IExtensionDefinitionModelDto } from "~/abstractions/models";

export class ExtensionDefinitionModel<TParams extends Record<string, any> = Record<string, any>>
    implements IExtensionDefinitionModel<TParams>
{
    public readonly name: string;
    public readonly params: Omit<IExtensionDefinitionModelDto<TParams>, "__type">;

    constructor(dto: IExtensionDefinitionModelDto<TParams>) {
        this.name = dto.name;
        this.params = dto.params ;
    }

    build() {
        return Promise.resolve();
    }

    validate() {
        return;
    }

    static fromDto<TParams extends Record<string, any> = Record<string, any>>(
        dto: IExtensionDefinitionModelDto<TParams>
    ) {
        return new ExtensionDefinitionModel(dto);
    }
}

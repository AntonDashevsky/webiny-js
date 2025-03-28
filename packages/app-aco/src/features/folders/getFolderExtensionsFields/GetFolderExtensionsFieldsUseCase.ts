import type { IGetFolderExtensionsFieldsUseCase } from "./IGetFolderExtensionsFieldsUseCase.js";
import type { IGetFolderExtensionsFieldsRepository } from "./IGetFolderExtensionsFieldsRepository.js";

export class GetFolderExtensionsFieldsUseCase implements IGetFolderExtensionsFieldsUseCase {
    private repository: IGetFolderExtensionsFieldsRepository;

    constructor(repository: IGetFolderExtensionsFieldsRepository) {
        this.repository = repository;
    }

    execute() {
        const extensionsField = this.repository.execute();

        const fields = extensionsField?.settings?.fields || [];

        return {
            fields: fields.filter(field => field.tags?.length)
        };
    }
}

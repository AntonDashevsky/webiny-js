import type {
    CreatePageRevisionFromParams,
    ICreatePageRevisionFromUseCase
} from "~/features/pages/createPageRevisionFrom/ICreatePageRevisionFromUseCase.js";
import type { ICreatePageRevisionFromRepository } from "~/features/pages/createPageRevisionFrom/ICreatePageRevisionFromRepository.js";
import { Page } from "~/domain/Page/index.js";

export class CreatePageRevisionFromUseCase implements ICreatePageRevisionFromUseCase {
    private repository: ICreatePageRevisionFromRepository;

    constructor(repository: ICreatePageRevisionFromRepository) {
        this.repository = repository;
    }

    async execute(params: CreatePageRevisionFromParams) {
        return await this.repository.execute(
            Page.create({
                id: params.id
            })
        );
    }
}

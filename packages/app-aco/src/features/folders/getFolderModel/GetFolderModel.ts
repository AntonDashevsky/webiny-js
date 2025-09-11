import type { IGetFolderModelGateway } from "./IGetFolderModelGateway";
import { GetFolderModelRepository } from "./GetFolderModelRepository";
import { GetFolderModelUseCase } from "./GetFolderModelUseCase";
import type { IGetFolderModelUseCase } from "./IGetFolderModelUseCase";
import type { IGetFolderModelRepository } from "./IGetFolderModelRepository";

interface IGetFolderModelInstance {
    useCase: IGetFolderModelUseCase;
    repository: IGetFolderModelRepository;
}

export class GetFolderModel {
    public static getInstance(gateway: IGetFolderModelGateway): IGetFolderModelInstance {
        const repository = new GetFolderModelRepository(gateway);
        const useCase = new GetFolderModelUseCase(repository);

        return {
            useCase,
            repository
        };
    }
}

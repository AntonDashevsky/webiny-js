import { IGetFolderModelGateway } from "./IGetFolderModelGateway.js";
import { GetFolderModelRepository } from "./GetFolderModelRepository.js";
import { GetFolderModelUseCase } from "./GetFolderModelUseCase.js";
import { IGetFolderModelUseCase } from "./IGetFolderModelUseCase.js";
import { IGetFolderModelRepository } from "./IGetFolderModelRepository.js";

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

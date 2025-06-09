import { type IGetFolderModelGateway } from "./IGetFolderModelGateway.js";
import { GetFolderModelRepository } from "./GetFolderModelRepository.js";
import { GetFolderModelUseCase } from "./GetFolderModelUseCase.js";
import { type IGetFolderModelUseCase } from "./IGetFolderModelUseCase.js";
import { type IGetFolderModelRepository } from "./IGetFolderModelRepository.js";

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

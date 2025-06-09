import { makeAutoObservable, runInAction } from "mobx";
import { type IGetFolderModelRepository } from "./IGetFolderModelRepository.js";
import { type IGetFolderModelGateway } from "./IGetFolderModelGateway.js";
import { type FolderModelDto } from "./FolderModelDto.js";

export class GetFolderModelRepository implements IGetFolderModelRepository {
    private model: FolderModelDto | undefined;
    private gateway: IGetFolderModelGateway;

    constructor(gateway: IGetFolderModelGateway) {
        this.gateway = gateway;
        this.model = undefined;
        makeAutoObservable(this);
    }

    async load() {
        if (!this.hasModel()) {
            const model = await this.gateway.execute();
            runInAction(() => {
                this.model = model;
            });
        }
    }

    getModel() {
        return this.model;
    }

    hasModel() {
        return Boolean(this.model);
    }
}

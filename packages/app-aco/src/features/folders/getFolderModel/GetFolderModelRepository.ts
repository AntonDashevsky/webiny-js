import { makeAutoObservable, runInAction } from "mobx";
import type { IGetFolderModelRepository } from "./IGetFolderModelRepository";
import type { IGetFolderModelGateway } from "./IGetFolderModelGateway";
import type { FolderModelDto } from "./FolderModelDto";

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

import { makeAutoObservable } from "mobx";
import { type IColumnsVisibilityRepository } from "./IColumnsVisibilityRepository.js";
import { type IColumnsVisibilityUpdater } from "./IColumnsVisibilityUpdater.js";
import { type OnColumnVisibilityChange } from "@webiny/ui/DataTable/index.js";

export class ColumnsVisibilityUpdater implements IColumnsVisibilityUpdater {
    private repository: IColumnsVisibilityRepository;

    constructor(repository: IColumnsVisibilityRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    public update: OnColumnVisibilityChange = async updaterOrValue => {
        const currentVisibility = this.repository.getVisibility();
        let newVisibility = currentVisibility;

        if (typeof updaterOrValue === "function") {
            newVisibility = updaterOrValue(currentVisibility || {});
        }

        this.repository.update(newVisibility || {});
    };
}

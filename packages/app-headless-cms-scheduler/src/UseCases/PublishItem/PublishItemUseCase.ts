import { makeAutoObservable } from "mobx";
import type { ISchedulerItemsRepository } from "~/Domain/Repositories";
import type { IPublishItemUseCase } from "./IPublishItemUseCase";

export class SchedulePublishItemUseCase implements IPublishItemUseCase {
    private repository: ISchedulerItemsRepository;

    constructor(repository: ISchedulerItemsRepository) {
        this.repository = repository;
        makeAutoObservable(this);
    }

    async execute(id: string, scheduleOn: Date) {
        await this.repository.schedulePublishItem(id, scheduleOn);
    }
}

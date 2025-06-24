import { IAppModel } from "~/abstractions/models";

type AppModelDto = IAppModel;

export class AppModel implements IAppModel {
    public readonly name: IAppModel['name'];
    public readonly paths: IAppModel["paths"];

    private constructor(params: AppModelDto) {
        this.name = params.name;
        this.paths = params.paths;
    }

    static fromDto(dto: AppModelDto): IAppModel {
        return new AppModel(dto);
    }
}

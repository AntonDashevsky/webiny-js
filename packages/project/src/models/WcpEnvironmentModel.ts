import { IWcpEnvironmentDto, IWcpEnvironmentModel } from "~/abstractions/models/index.js";

export class WcpEnvironmentModel implements IWcpEnvironmentModel {
    id: string;
    status: string;
    name: string;
    apiKey: string;
    org: {
        id: string;
        name: string;
    };
    project: {
        id: string;
        name: string;
    };
    user: {
        id: string;
        email: string;
    };

    private constructor(dto: IWcpEnvironmentDto) {
        this.id = dto.id;
        this.status = dto.status;
        this.name = dto.name;
        this.apiKey = dto.apiKey;
        this.org = {
            id: dto.org.id,
            name: dto.org.name
        };
        this.project = {
            id: dto.project.id,
            name: dto.project.name
        };
        this.user = {
            id: dto.user.id,
            email: dto.user.email
        };
    }

    static fromDto(dto: IWcpEnvironmentDto) {
        return new WcpEnvironmentModel(dto);
    }
}

import type { IListAdminUsersGateway } from "./IListAdminUsersGateway.js";
import type { AcoContext } from "~/types.js";

export class ListAdminUsersGatewayFromContext implements IListAdminUsersGateway {
    private context: AcoContext;

    constructor(context: AcoContext) {
        this.context = context;
    }

    public async execute() {
        const { security, adminUsers } = this.context;

        return security.withoutAuthorization(async () => {
            return adminUsers.listUsers();
        });
    }
}

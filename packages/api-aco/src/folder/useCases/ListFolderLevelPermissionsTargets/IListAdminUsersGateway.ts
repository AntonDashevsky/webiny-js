import type { AdminUser } from "@webiny/api-admin-users/types.js";

export interface IListAdminUsersGateway {
    execute: () => Promise<AdminUser[]>;
}

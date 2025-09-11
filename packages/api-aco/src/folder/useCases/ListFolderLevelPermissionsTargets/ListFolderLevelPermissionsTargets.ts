import type { IListFolderLevelPermissionsTargets } from "./IListFolderLevelPermissionsTargets.js";
import type { IListAdminUsersGateway } from "./IListAdminUsersGateway.js";
import type { IListTeamsGateway } from "./IListTeamsGateway.js";
import { validation } from "@webiny/validation";
import type {
    FolderLevelPermissionsTarget,
    FolderLevelPermissionsTargetListMeta
} from "~/folder/folder.types.js";

export class ListFolderLevelPermissionsTargets implements IListFolderLevelPermissionsTargets {
    private listAdminUsersGateway: IListAdminUsersGateway;
    private listTeamsGateway: IListTeamsGateway;

    constructor(
        listAdminUsersGateway: IListAdminUsersGateway,
        listTeamsGateway: IListTeamsGateway
    ) {
        this.listAdminUsersGateway = listAdminUsersGateway;
        this.listTeamsGateway = listTeamsGateway;
    }

    public async execute(): Promise<
        [FolderLevelPermissionsTarget[], FolderLevelPermissionsTargetListMeta]
    > {
        const adminUsers = await this.listAdminUsersGateway.execute();
        const teams = await this.listTeamsGateway.execute();

        const teamTargets = teams.map(team => ({
            id: team.id,
            type: "team",
            target: `team:${team.id}`,
            name: team.name || "",
            meta: {}
        }));

        const adminUserTargets = adminUsers.map(user => {
            let name = user.displayName;
            if (!name) {
                // For backwards compatibility, we also want to try concatenating first and last name.
                name = [user.firstName, user.lastName].filter(Boolean).join(" ");
            }

            // We're doing the validation because, with non-Cognito IdPs (Okta, Auth0), the email
            // field might actually contain a non-email value: `id:${IdP_Identity_ID}`. In that case,
            // let's not assign anything to the `email` field.
            let email: string | null = user.email;
            try {
                validation.validateSync(email, "email");
            } catch {
                email = null;
            }

            const image = user.avatar?.src || null;

            return {
                id: user.id,
                type: "admin",
                target: `admin:${user.id}`,
                name,
                meta: {
                    email,
                    image
                }
            };
        });

        const results = [...teamTargets, ...adminUserTargets];
        const meta = { totalCount: results.length };

        return [results, meta];
    }
}

import { ContextPlugin } from "@webiny/api";
import { AdminUsersContext } from "~/types.js";

export const createExternalIdpAdminUserHooks = (context: AdminUsersContext) => {
    const { security, adminUsers } = context;

    security.onLogin.subscribe(async ({ identity }) => {
        await security.withoutAuthorization(async () => {
            const user = await adminUsers.getUser({ where: { id: identity.id } });

            const id = identity.id;
            const email = identity.email || `id:${id}`;
            const displayName = identity.displayName || "Missing display name";

            const data = {
                displayName,
                email,

                firstName: identity.firstName || "",
                lastName: identity.lastName || "",

                groups: [] as string[],
                teams: [] as string[],

                external: true
            };

            let groupSlugs: string[] = [];
            if (identity.group) {
                groupSlugs = [identity.group];
            }

            if (Array.isArray(identity.groups)) {
                groupSlugs = groupSlugs.concat(identity.groups);
            }

            let teamSlugs: string[] = [];
            if (identity.team) {
                teamSlugs = [identity.team];
            }

            if (Array.isArray(identity.teams)) {
                teamSlugs = teamSlugs.concat(identity.teams);
            }

            if (groupSlugs.length > 0) {
                const groups = await security.listGroups({ where: { slug_in: groupSlugs } });
                data.groups = groups.map(group => group.id);
            }

            if (teamSlugs.length > 0) {
                const teams = await security.listTeams({ where: { slug_in: teamSlugs } });
                data.teams = teams.map(team => team.id);
            }

            if (user) {
                await adminUsers.updateUser(identity.id, data);
                return;
            }

            await adminUsers.createUser({ id, ...data });
        });
    });
};

export const createExternalIdpAdminUserHooksPlugin = () => {
    return new ContextPlugin<AdminUsersContext>(async context => {
        createExternalIdpAdminUserHooks(context);
    });
};

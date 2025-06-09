import { ListAdminUsersGatewayFromContext } from "./ListAdminUsersGatewayFromContext.js";
import { ListTeamsGatewayFromContext } from "./ListTeamsGatewayFromContext.js";
import { ListFolderLevelPermissionsTargets } from "./ListFolderLevelPermissionsTargets.js";
import type { AcoContext } from "~/types.js";

interface GetListFolderLevelPermissionsTargetsParams {
    context: AcoContext;
}

export const getListFolderLevelPermissionsTargets = (
    params: GetListFolderLevelPermissionsTargetsParams
) => {
    const listAdminUsersGateway = new ListAdminUsersGatewayFromContext(params.context);
    const listTeamsGateway = new ListTeamsGatewayFromContext(params.context);

    const listFolderLevelPermissionsTargetsUseCase = new ListFolderLevelPermissionsTargets(
        listAdminUsersGateway,
        listTeamsGateway
    );

    return {
        listFolderLevelPermissionsTargetsUseCase
    };
};

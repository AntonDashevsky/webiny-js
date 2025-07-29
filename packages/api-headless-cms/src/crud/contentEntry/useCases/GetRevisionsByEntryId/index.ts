import { GetRevisionsByEntryId } from "./GetRevisionsByEntryId";
import { GetRevisionsByEntryIdNotDeleted } from "./GetRevisionsByEntryIdNotDeleted";
import type { CmsEntryStorageOperations } from "~/types";
import type { AccessControl } from "~/crud/AccessControl/AccessControl";

interface GetRevisionsByEntryIdUseCasesParams {
    operation: CmsEntryStorageOperations["getRevisions"];
    accessControl: AccessControl;
}

export const getRevisionsByEntryIdUseCases = (params: GetRevisionsByEntryIdUseCasesParams) => {
    const getRevisionsByEntryId = new GetRevisionsByEntryId(params.operation);
    const getRevisionsByEntryIdNotDeleted = new GetRevisionsByEntryIdNotDeleted(
        getRevisionsByEntryId
    );

    return {
        getRevisionsByEntryIdUseCase: getRevisionsByEntryIdNotDeleted
    };
};

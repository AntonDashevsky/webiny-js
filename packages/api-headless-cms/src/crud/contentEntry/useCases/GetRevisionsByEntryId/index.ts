import { GetRevisionsByEntryId } from "./GetRevisionsByEntryId.js";
import { GetRevisionsByEntryIdNotDeleted } from "./GetRevisionsByEntryIdNotDeleted.js";
import { CmsEntryStorageOperations } from "~/types/index.js";
import { AccessControl } from "~/crud/AccessControl/AccessControl.js";

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

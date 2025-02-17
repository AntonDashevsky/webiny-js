import { PbContext } from "@webiny/api-page-builder/graphql/types.js";
import { FormBuilderContext } from "@webiny/api-form-builder/types.js";
import { AcoContext } from "@webiny/api-aco/types.js";
import { MailerContext } from "@webiny/api-mailer/types.js";
import { SecurityContext } from "@webiny/api-security/types.js";
import { PbImportExportContext } from "@webiny/api-page-builder-import-export/graphql/types.js";
import { ApwContext } from "@webiny/api-apw/types.js";
import { Context as BaseContext } from "@webiny/handler/types.js";

export * from "~/app/types.js";

export interface Action {
    type: string;
    displayName: string;
    /**
     * Delay in seconds before a new audit log can be created.
     * During this delay actions will update existing audit log instead of creating new ones.
     */
    newEntryDelay?: number;
}

export interface Entity {
    type: string;
    displayName: string;
    linkToEntity?: (id: string) => string;
    actions: Action[];
}

export interface App {
    app: string;
    displayName: string;
    entities: Entity[];
}

export interface AuditLog {
    id: string;
    message: string;
    app: string;
    entity: string;
    entityId: string;
    action: string;
    data: JSON;
    timestamp: Date;
    initiator: string;
}

export interface AuditLogsContext
    extends BaseContext,
        PbContext,
        FormBuilderContext,
        AcoContext,
        MailerContext,
        SecurityContext,
        ApwContext {
    pageBuilder: PbImportExportContext["pageBuilder"];
    formBuilder: PbImportExportContext["formBuilder"];
}

export interface AuditObject {
    [app: string]: EntityObject;
}

export interface EntityObject {
    [entity: string]: ActionObject;
}

export interface ActionObject {
    [action: string]: AuditAction;
}

export interface AuditAction {
    app: App;
    entity: Entity;
    action: Action;
}

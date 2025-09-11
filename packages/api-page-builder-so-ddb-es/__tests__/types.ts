import type { Page } from "@webiny/api-page-builder/types";
import type { PbCreatePayload, PbUpdatePayload } from "@webiny/api-page-builder-aco/types";

export interface CustomFieldsPbCreatePayload extends PbCreatePayload {
    data: PbCreatePayload["data"] & {
        customViews: number;
    };
}

export interface CustomFieldsPbUpdatePayload extends PbUpdatePayload {
    data: PbCreatePayload["data"] & {
        customViews: number;
    };
}

export interface CustomFieldsPage extends Page {
    customViews: number;
}

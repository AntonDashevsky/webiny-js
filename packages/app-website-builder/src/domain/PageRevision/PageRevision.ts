import { type WbStatus } from "~/constants.js";
import { toTitleCaseLabel } from "~/shared/toTitleCaseLabel";

export interface PageRevisionData {
    id: string;
    pageId: string;
    status: WbStatus;
    version: number;
    savedOn: string;
    title: string;
    locked: boolean;
}

export class PageRevision {
    public readonly id: string;
    public readonly pageId: string;
    public readonly status: WbStatus;
    public readonly version: number;
    public readonly savedOn: string;
    public readonly title: string;
    public readonly locked: boolean;

    protected constructor(data: PageRevisionData) {
        this.id = data.id;
        this.pageId = data.pageId;
        this.status = data.status;
        this.version = data.version;
        this.savedOn = data.savedOn;
        this.title = data.title;
        this.locked = data.locked;
    }

    getLabel() {
        return `v${this.version} (${toTitleCaseLabel(this.status)})`;
    }

    static create(data: PageRevisionData) {
        return new PageRevision(data);
    }
}

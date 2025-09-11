import type { CmsGroupCreateInput } from "@webiny/api-headless-cms/types/index.js";

export const createGroupData = (): CmsGroupCreateInput => {
    return {
        id: "mocks",
        icon: "fas/star",
        name: "Mocks",
        description: "A group for mock models",
        slug: "mocks"
    };
};

export enum EntityType {
    CMS = "headless-cms",
    PAGE_BUILDER = "page-builder"
}

export interface IGetElasticsearchEntityTypeParams {
    SK: string;
    index: string;
}

export const getElasticsearchEntityType = (
    params: IGetElasticsearchEntityTypeParams
): EntityType => {
    if (params.index.includes("-headless-cms-")) {
        return EntityType.CMS;
    } else if (params.index.endsWith("-page-builder")) {
        return EntityType.PAGE_BUILDER;
    }

    throw new Error(`Unknown entity type for item "${JSON.stringify(params)}".`);
};

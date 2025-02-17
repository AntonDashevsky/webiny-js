import type { PbDataSource } from "@webiny/app-page-builder/types.js";

export const hasMainDataSource = (dataSources: PbDataSource[]): boolean => {
    return dataSources.some(source => source.name === "main");
};

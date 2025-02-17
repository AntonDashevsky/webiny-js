/**
 * TODO determine if GSIs are needed
 */
import { Entity } from "~/toolbox.js";
import { Table } from "~/utils/index.js";

export interface ICreateEntityParams {
    table: Table;
}

export const createEntity = ({ table }: ICreateEntityParams) => {
    return new Entity({
        table,
        name: "WebinyKeyValue",
        attributes: {
            PK: {
                partitionKey: true
            },
            SK: {
                sortKey: true
            },
            TYPE: {
                type: "string"
            },
            key: {
                type: "string"
            },
            value: {
                type: "string"
            }
        },
        autoExecute: true,
        autoParse: true
    });
};

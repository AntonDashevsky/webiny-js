import { type GenericRecord } from "@webiny/api/types.js";
import {
    type IDeleteOperationParams,
    type IInsertOperationParams,
    type IModifyOperationParams,
    type IOperations
} from "~/types.js";

export enum OperationType {
    INSERT = "INSERT",
    MODIFY = "MODIFY",
    REMOVE = "REMOVE"
}

export class Operations implements IOperations {
    private _items: GenericRecord[] = [];

    public get items(): GenericRecord[] {
        return this._items;
    }

    public get total(): number {
        return this.items.length;
    }

    public clear() {
        this._items = [];
    }

    public insert(params: IInsertOperationParams): void {
        this.items.push(
            {
                index: {
                    _id: params.id,
                    _index: params.index
                }
            },
            params.data
        );
    }

    public modify(params: IModifyOperationParams): void {
        this.insert(params);
    }

    public delete(params: IDeleteOperationParams): void {
        this.items.push({
            delete: {
                _id: params.id,
                _index: params.index
            }
        });
    }
}

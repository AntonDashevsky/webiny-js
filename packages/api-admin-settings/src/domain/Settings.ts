import type { GenericRecord } from "@webiny/utils";

export class Settings<T = GenericRecord<string>> {
    private readonly name: string;
    private readonly data: T;

    constructor(name: string, data: T) {
        this.name = name;
        this.data = data;
    }

    getName() {
        return this.name;
    }

    getData() {
        return this.data as T;
    }
}

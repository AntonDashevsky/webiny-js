import type { CmsEntryListWhere } from "@webiny/api-headless-cms/types/index.js";
import type { ElasticsearchBoolQueryConfig } from "@webiny/api-elasticsearch/types.js";
import type { Query } from "./mocks/index.js";
import { createQuery, createPluginsContainer } from "./mocks/index.js";
import type { CreateExecFilteringResponse } from "./mocks/filtering.js";
import { createExecFiltering } from "./mocks/filtering.js";

describe("not_in filter", () => {
    let query: Query;
    let execFiltering: CreateExecFilteringResponse;

    beforeEach(() => {
        query = createQuery();
        execFiltering = createExecFiltering({
            plugins: createPluginsContainer()
        });
    });

    it("should add not_in filter - string only", async () => {
        const list = ["someId", "someOtherId", "anotherOtherId"];
        const where: CmsEntryListWhere = {
            id_not_in: list
        };

        execFiltering({
            query,
            where
        });

        const expected: ElasticsearchBoolQueryConfig = {
            should: [],
            must: [],
            filter: [],
            must_not: [
                {
                    terms: {
                        "id.keyword": list
                    }
                }
            ]
        };

        expect(query).toEqual(expected);
    });

    it("should add not_in filter - string and number", async () => {
        const list: any = ["someId", "someOtherId", "anotherOtherId", 5];
        const where: CmsEntryListWhere = {
            id_not_in: list
        };

        execFiltering({
            query,
            where
        });

        const expected: ElasticsearchBoolQueryConfig = {
            should: [],
            must: [],
            filter: [],
            must_not: [
                {
                    terms: {
                        id: list
                    }
                }
            ]
        };

        expect(query).toEqual(expected);
    });

    it("should throw error when input is not an array", async () => {
        const where: CmsEntryListWhere = {
            /**
             * We expect error because string cannot be passed into the _in operator.
             * We are testing for the error throwing.
             */
            // @ts-expect-error
            id_not_in: ""
        };

        expect(() => {
            execFiltering({
                query,
                where
            });
        }).toThrow(
            `You cannot filter field "id" with "not_in" operator and not send an array of values.`
        );
    });

    it("should throw error when input is an empty array", async () => {
        const where: CmsEntryListWhere = {
            id_not_in: []
        };

        expect(() => {
            execFiltering({
                query,
                where
            });
        }).toThrow(
            `You cannot filter field "id" with "not_in" operator and not send an array of values.`
        );
    });
});

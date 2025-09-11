import type { CmsEntryListWhere } from "@webiny/api-headless-cms/types/index.js";
import type { ElasticsearchBoolQueryConfig } from "@webiny/api-elasticsearch/types.js";
import type { Query } from "./mocks/index.js";
import { createQuery, createPluginsContainer } from "./mocks/index.js";
import type { CreateExecFilteringResponse } from "~/operations/entry/elasticsearch/filtering/index.js";
import { createExecFiltering } from "./mocks/filtering.js";

describe("not equals filter", () => {
    let query: Query;
    let execFiltering: CreateExecFilteringResponse;

    beforeEach(() => {
        query = createQuery();
        execFiltering = createExecFiltering({
            plugins: createPluginsContainer()
        });
    });

    it("should add not equal filter - null", async () => {
        const where: CmsEntryListWhere = {
            title_not: null
        };

        execFiltering({
            query,
            where
        });

        const expected: ElasticsearchBoolQueryConfig = {
            should: [],
            must: [],
            filter: [
                {
                    exists: {
                        field: "values.title.keyword"
                    }
                }
            ],
            must_not: []
        };

        expect(query).toEqual(expected);
    });

    it("should add not equal filter - string", async () => {
        const title = "Webiny Serverless";
        const where: CmsEntryListWhere = {
            title_not: title
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
                    term: {
                        "values.title.keyword": title
                    }
                }
            ]
        };

        expect(query).toEqual(expected);
    });

    it("should add not equal filter - boolean", async () => {
        const where: CmsEntryListWhere = {
            isMarried_not: true
        };

        execFiltering({
            query,
            where
        });

        const expected: ElasticsearchBoolQueryConfig = {
            must: [],
            should: [],
            filter: [
                {
                    bool: {
                        must_not: {
                            term: {
                                "values.isMarried": true
                            }
                        }
                    }
                }
            ],
            must_not: []
        };

        expect(query).toEqual(expected);
    });

    it("should add not equal filter - number", async () => {
        const where: CmsEntryListWhere = {
            age_not: 2
        };

        execFiltering({
            query,
            where
        });

        const expected: ElasticsearchBoolQueryConfig = {
            must: [],
            should: [],
            filter: [],
            must_not: [
                {
                    term: {
                        "values.age": 2
                    }
                }
            ]
        };

        expect(query).toEqual(expected);
    });
});

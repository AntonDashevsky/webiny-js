type PerformSearchParams = {
    gqlQuery: string;
    query?: string;
    filter: string;
    pageSize?: number;
    startIndex?: number;
};
type KiboConfig = {
    apiHost: string;
    authToken: string;
};

export const productSearchQuery = /* GraphQL */ `
    query Search($query: String, $filter: String, $pageSize: Int, $startIndex: Int) {
        searchResult: productSearch(
            query: $query
            filter: $filter
            pageSize: $pageSize
            startIndex: $startIndex
        ) {
            items {
                productCode
                content {
                    productName
                    productShortDescription
                    productImages {
                        imageUrl
                    }
                }
                price {
                    price
                }
            }
            totalCount
            pageSize
            startIndex
        }
    }
`;

export const categorySearchQuery = /* GraphQL */ `
    query getCategories($filter: String) {
        searchResult: categories(filter: $filter) {
            items {
                categoryCode
                content {
                    name
                    slug
                    categoryImages {
                        imageUrl
                    }
                }
            }
        }
    }
`;

export class KiboClient {
    private readonly graphQLUrl: string;
    private readonly authToken: string;

    constructor({ apiHost, authToken }: KiboConfig, cache: any) {
        this.graphQLUrl = `https://${apiHost}/graphql`;
        this.authToken = authToken;
    }

    async getAccessToken() {
        return this.authToken;
    }

    async getHeaders() {
        const authToken = await this.getAccessToken();
        return {
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        };
    }

    async performSearch({ gqlQuery, query, filter, pageSize, startIndex }: PerformSearchParams) {
        const headers = await this.getHeaders();
        const body = {
            query: gqlQuery,
            variables: { query, filter, pageSize, startIndex }
        };
        const params = { method: "POST", ...headers, body: JSON.stringify(body) };
        const request = await fetch(this.graphQLUrl, params);
        const response = await request.json();
        return response.data.searchResult;
    }

    async performProductSearch(searchOptions: any) {
        return await this.performSearch({ gqlQuery: productSearchQuery, ...searchOptions });
    }

    async getItemsByProductCode(items: string[] = []) {
        const filter = items.map(productCode => `productCode eq ${productCode}`).join(" or ");
        try {
            const result = await this.performSearch({ gqlQuery: productSearchQuery, filter });
            return result.items;
        } catch (error) {
            console.error(error);
        }
    }

    async performCategorySearch(searchOptions: any) {
        return await this.performSearch({ gqlQuery: categorySearchQuery, ...searchOptions });
    }

    async getItemsByCategoryCode(items: string[] = []) {
        const filter = items.map(categoryCode => `categoryCode eq ${categoryCode}`).join(" or ");
        try {
            const result = await this.performSearch({ gqlQuery: categorySearchQuery, filter });
            return result.items;
        } catch (error) {
            console.error(error);
        }
    }
}

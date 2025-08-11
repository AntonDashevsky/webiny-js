interface QueryParams {
    query: string;
    variables: Record<string, any>;
    preview?: boolean;
}

type WithPath<T> = T & {
    path?: string;
};

export class ApiClient {
    private readonly apiHost: string;
    private readonly apiKey: string;
    private readonly apiTenant: string;

    constructor(apiHost: string, apiKey: string, apiTenant: string) {
        this.apiTenant = apiTenant;
        this.apiHost = apiHost;
        this.apiKey = apiKey;
    }

    async fetch({ headers, path, ...params }: WithPath<RequestInit>): Promise<any> {
        return fetch(`${this.apiHost}${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Tenant": this.apiTenant,
                Authorization: "Bearer " + this.apiKey,
                ...headers
            },
            ...params
        }).then(res => res.json());
    }

    async query({ query, variables, preview }: QueryParams) {
        const fetchOptions = {
            next: {
                revalidate: preview ? 0 : 60
            }
        };

        const request: WithPath<RequestInit> = {
            ...fetchOptions,
            path: "/graphql",
            method: "POST",
            body: JSON.stringify({
                query,
                variables
            })
        };

        const json = await this.fetch(request);

        if (json.message) {
            throw new Error(json.message);
        }

        if (json.errors) {
            console.error(json.errors);
            throw new Error("Failed to fetch API");
        }

        return json.data;
    }
}

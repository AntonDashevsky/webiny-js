interface QueryParams {
    query: string;
    variables: Record<string, any>;
    preview: boolean;
}

export class ApiClient {
    private readonly apiEndpoint: string;
    private readonly apiKey: string;

    constructor(apiEndpoint: string, apiKey: string) {
        this.apiEndpoint = apiEndpoint;
        this.apiKey = apiKey;
    }

    async query({ query, variables, preview }: QueryParams) {
        const fetchOptions = {
            next: {
                revalidate: preview ? 0 : 60
            }
        };
        const request = {
            ...fetchOptions,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.apiKey
            },
            body: JSON.stringify({
                query,
                variables
            })
        };

        const res = await fetch(this.apiEndpoint, request);
        const json = await res.json();
        if (json.errors) {
            console.error(json.errors);
            throw new Error("Failed to fetch API");
        }

        return json.data;
    }
}

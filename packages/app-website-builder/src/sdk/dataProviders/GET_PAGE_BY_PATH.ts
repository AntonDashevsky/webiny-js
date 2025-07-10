export const GET_PAGE_BY_PATH = /* GraphQL*/ `
    query GetPageByPath($path: String!, $preview: Boolean) {
        websiteBuilder {
            getPageByPath(path: $path, preview: $preview) {
                data {
                    id
                    properties
                    elements
                    bindings
                }
                error {
                    code
                    message
                    data
                }
            }
        }
    }
`;

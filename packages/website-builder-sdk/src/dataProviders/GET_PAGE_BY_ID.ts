export const GET_PAGE_BY_ID = /* GraphQL*/ `
    query GetPageById($id: ID!) {
        websiteBuilder {
            getPageById(id: $id) {
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

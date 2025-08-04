export const GET_ACTIVE_REDIRECTS = /* GraphQL*/ `
    query GetActiveRedirects {
        websiteBuilder {
            getActiveRedirects {
                data {
                    id
                    from
                    to
                    permanent
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

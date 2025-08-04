export const LIST_ACTIVE_REDIRECTS = /* GraphQL*/ `
    query ListActiveRedirects {
        websiteBuilder {
            listActiveRedirects {
                data {
                    id
                    from
                    to
                    type
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

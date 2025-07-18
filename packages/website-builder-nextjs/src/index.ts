export * from "@webiny/website-builder-react";

import { setHeadersProvider } from "@webiny/website-builder-react";

setHeadersProvider(async () => {
    // @ts-expect-error This is a peer dependency.
    const { headers } = await import("next/headers");
    return await headers();
});

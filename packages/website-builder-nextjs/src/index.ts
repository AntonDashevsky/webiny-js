export * from "@webiny/website-builder-react";

import { setHeadersProvider } from "@webiny/website-builder-react";

setHeadersProvider(async () => {
    const { headers } = await import("next/headers");
    return await headers();
});

import * as React from "react";
import { type Plugin } from "@webiny/plugins/types.js";
import { NotAuthorizedError } from "~/components/NotAuthorizedError/index.js";

type SecureRouteErrorPlugin = Plugin & { render: () => React.ReactNode };

const plugin: SecureRouteErrorPlugin = {
    type: "secure-route-error",
    name: "secure-route-error",
    render(): React.ReactElement {
        return <NotAuthorizedError />;
    }
};

export default plugin;

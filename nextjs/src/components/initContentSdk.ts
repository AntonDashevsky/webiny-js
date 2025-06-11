import type { ComponentManifest } from "@webiny/app-website-builder/sdk/types";
import { contentSdk, registerComponentGroup } from "@webiny/app-website-builder/react/index";

export const initContentSdk = () => {
    contentSdk.init({
        apiKey: "123",
        // builtInComponents: false,
        // theme: {}
    });

    registerComponentGroup({
        name: "basic",
        label: "Basic"
    });

    registerComponentGroup({
        name: "ecommerce",
        label: "eCommerce"
    });

    registerComponentGroup({
        name: "custom",
        label: "Custom",
        filter: (component: ComponentManifest) => !component.group
    });
};

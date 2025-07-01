import {
    contentSdk,
    registerComponentGroup,
    type ComponentManifest
} from "@webiny/website-builder-react";

interface InitContentSdkOptions {
    preview?: boolean;
    apiKey?: string;
}

let initialized = false;

export const initContentSdk = (options: InitContentSdkOptions = {}) => {
    if (initialized) {
        return;
    }

    contentSdk.init({
        apiKey: options.apiKey ?? String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY),
        preview: options.preview ?? false
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

    initialized = true;
};

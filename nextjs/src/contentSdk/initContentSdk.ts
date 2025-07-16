import {
    contentSdk,
    registerComponentGroup,
    type ComponentManifest
} from "@webiny/website-builder-react";

interface InitContentSdkOptions {
    preview?: boolean;
}


export const initContentSdk = (options: InitContentSdkOptions = {}) => {
    contentSdk.init(
        {
            apiKey: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY),
            apiHost: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_HOST),
            apiTenant: String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_TENANT),
            preview: options.preview === true
        },
        () => {
            registerComponentGroup({
                name: "basic",
                label: "Basic",
                description: "Components for simple content creation"
            });

            registerComponentGroup({
                name: "custom",
                label: "Custom",
                description: "Assorted custom components",
                filter: (component: ComponentManifest) => !component.group
            });
        }
    );
};

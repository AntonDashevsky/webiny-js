import {
    contentSdk,
    registerComponentGroup,
    type ComponentManifest
} from "@webiny/website-builder-react";

interface InitContentSdkOptions {
    preview?: boolean;
    apiKey?: string;
}

export const initContentSdk = (options: InitContentSdkOptions = {}) => {
    contentSdk.init(
        {
            apiKey: options.apiKey ?? String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY),
            apiEndpoint: "https://dc4s05sapah2w.cloudfront.net/graphql",
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

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
    const previewMode = options.preview === true && !contentSdk.isEditing();
    console.log("SDK in preview mode?", previewMode);

    contentSdk.init(
        {
            apiKey: options.apiKey ?? String(process.env.NEXT_PUBLIC_WEBSITE_BUILDER_API_KEY),
            preview: previewMode ?? false
            // builtInComponents: false,
            // theme: {}
        },
        () => {
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
        }
    );
};

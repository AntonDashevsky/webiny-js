import type { Component, ComponentManifest } from "~/sdk/types.js";

export const createComponent = (
    component: React.ComponentType<any>,
    manifest: ComponentManifest
): Component => {
    return {
        component,
        manifest
    };
};

export { AddQuerySelectionPlugin } from "./plugins/AddQuerySelectionPlugin.js";
export { ApolloLinkPlugin } from "./plugins/ApolloLinkPlugin.js";
export { RoutePlugin } from "./plugins/RoutePlugin.js";
export { ApolloCacheObjectIdPlugin, type ApolloCacheObject } from "./plugins/ApolloCacheObjectIdPlugin.js";

// Composition - we re-export this for ease of use
export * from "@webiny/react-composition";
export type { HigherOrderComponent, ComposeProps, ComposableFC } from "@webiny/react-composition";

// App framework
export * from "./App.js";
export type { AppProps } from "./App.js";
export * from "./core/Plugins.js";
export * from "./core/Plugin.js";
export * from "./core/Provider.js";
export * from "./core/AddRoute.js";
export * from "./core/DebounceRender.js";
export * from "./core/createProvider.js";
export * from "./core/createProviderPlugin.js";
export * from "./renderApp.js";
export * from "./utils/createGenericContext.js";

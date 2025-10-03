export { AddQuerySelectionPlugin } from "./plugins/AddQuerySelectionPlugin.js";
export { ApolloLinkPlugin } from "./plugins/ApolloLinkPlugin.js";
export {
    ApolloCacheObjectIdPlugin,
    type ApolloCacheObject
} from "./plugins/ApolloCacheObjectIdPlugin.js";

// Composition - we re-export this for ease of use
export * from "@webiny/react-composition";
export type { HigherOrderComponent, ComposeProps, ComposableFC } from "@webiny/react-composition";

// App framework
export * from "./App.js";
export * from "./AppContainer.js";
export type { AppProps } from "./App.js";
export * from "./core/Plugins.js";
export * from "./core/Plugin.js";
export * from "./core/Provider.js";
export * from "./core/DebounceRender.js";
export * from "./core/createProvider.js";
export * from "./core/createProviderPlugin.js";
export * from "./renderApp.js";
export * from "./utils/createGenericContext.js";
export { useContainer } from "./di/DiContainerProvider.js";

export { Route } from "./features/router/Route.js";
export { useRouter, useRoute } from "./presentation/router/index.js";
export { RouteLink, type RouteLinkProps } from "./presentation/router/components/RouteLink.js";
export { SimpleLink, type SimpleLinkProps } from "./presentation/router/components/SimpleLink.js";

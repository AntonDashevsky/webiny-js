import installation from "~/plugins/installation.js";
export * from "./contexts/Tenancy.js";
export * from "./hooks/useTenancy.js";
export * from "./withTenant.js";
export * from "./Tenancy.js";

export const plugins = () => [installation];

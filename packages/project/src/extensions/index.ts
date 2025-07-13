export * from "./createExtension";
export * from "./models";

import { apiBeforeBuild } from "./ApiBeforeBuild.js";
import { apiBeforeDeploy } from "./ApiBeforeDeploy.js";

export const ApiBeforeBuild = apiBeforeBuild.ReactComponent;
export const ApiBeforeDeploy = apiBeforeDeploy.ReactComponent;

export const definitions = [apiBeforeBuild.definition, apiBeforeDeploy.definition];

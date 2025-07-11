import { ExtensionInstanceModel } from "~/extensions/models/index.js";

export type ExtensionType = string;

export type ExtensionDto = Record<string, any>;
export type IProjectConfigDto = Record<ExtensionType, Array<ExtensionDto>>;

export type IHydratedProjectConfig = Record<ExtensionType, Array<ExtensionInstanceModel>>;

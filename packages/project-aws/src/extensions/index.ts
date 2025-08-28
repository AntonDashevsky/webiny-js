import { awsTags } from "./awsTags.js";
import { vpcSettings } from "./vpcSettings.js";

export const AwsTags = awsTags.ReactComponent;
export const VpcSettings = vpcSettings.ReactComponent;

export const definitions = [awsTags.definition, vpcSettings.definition];

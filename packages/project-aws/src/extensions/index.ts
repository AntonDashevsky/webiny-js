import { awsTags } from "./awsTags.js";
import { vpc } from "./vpc.js";

export const AwsTags = awsTags.ReactComponent;
export const Vpc = vpc.ReactComponent;

export const definitions = [awsTags.definition, vpc.definition];

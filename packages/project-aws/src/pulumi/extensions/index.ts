import { awsTags } from "./awsTags.js";
import { elasticSearch } from "./elasticSearch.js";
import { openSearch } from "./openSearch.js";
import { vpc } from "./vpc.js";
import { adminCustomDomains } from "./adminCustomDomains.js";
import { blueGreenDeployments } from "~/pulumi/extensions/blueGreenDeployments.js";

export const AwsTags = awsTags.ReactComponent;
export const Vpc = vpc.ReactComponent;
export const ElasticSearch = elasticSearch.ReactComponent;
export const OpenSearch = openSearch.ReactComponent;
export const AdminCustomDomains = adminCustomDomains.ReactComponent;
export const BlueGreenDeployments = blueGreenDeployments.ReactComponent;

export const definitions = [
    awsTags.definition,
    vpc.definition,
    elasticSearch.definition,
    openSearch.definition,
    adminCustomDomains.definition,
    blueGreenDeployments.definition
];

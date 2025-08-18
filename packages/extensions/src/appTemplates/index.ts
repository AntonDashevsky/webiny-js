import { coreAppTemplate } from "./CoreAppTemplate";
import { apiAppTemplate } from "./ApiAppTemplate";
import { adminAppTemplate } from "./AdminAppTemplate";
import { websiteAppTemplate } from "./WebsiteAppTemplate";

export const CoreAppTemplate = coreAppTemplate.ReactComponent;
export const ApiAppTemplate = apiAppTemplate.ReactComponent;
export const AdminAppTemplate = adminAppTemplate.ReactComponent;
export const WebsiteAppTemplate = websiteAppTemplate.ReactComponent;

export const definitions = [
    coreAppTemplate.definition,
    apiAppTemplate.definition,
    adminAppTemplate.definition,
    websiteAppTemplate.definition
];

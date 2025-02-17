import { PageSecurityPermission } from "~/types.js";
import { AppPermissions } from "@webiny/api-security";

export class PagesPermissions extends AppPermissions<PageSecurityPermission> {}

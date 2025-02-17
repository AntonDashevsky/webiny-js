import { FbFormPermission } from "~/types.js";
import { AppPermissions } from "@webiny/api-security/utils/AppPermissions.js";

export class FormsPermissions extends AppPermissions<FbFormPermission> {}

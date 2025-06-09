import { AppPermissions } from "@webiny/api-security/utils/AppPermissions.js";
import type { SettingsSecurityPermission } from "~/types.js";

export class SettingsPermissions extends AppPermissions<SettingsSecurityPermission> {}

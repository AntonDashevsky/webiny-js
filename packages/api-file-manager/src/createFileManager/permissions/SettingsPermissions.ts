import { AppPermissions } from "@webiny/api-security/utils/AppPermissions.js";
import type { SettingsPermission } from "~/types.js";

export class SettingsPermissions extends AppPermissions<SettingsPermission> {}

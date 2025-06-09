import { AppPermissions } from "@webiny/api-security/utils/AppPermissions.js";
import { type FilePermission } from "~/types.js";

export class FilesPermissions extends AppPermissions<FilePermission> {}

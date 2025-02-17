import { AppPermissions } from "@webiny/api-security/utils/AppPermissions.js";
import { FilePermission } from "~/types.js";

export class FilesPermissions extends AppPermissions<FilePermission> {}

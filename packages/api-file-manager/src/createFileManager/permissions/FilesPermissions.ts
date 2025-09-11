import { AppPermissions } from "@webiny/api-security/utils/AppPermissions";
import type { FilePermission } from "~/types";

export class FilesPermissions extends AppPermissions<FilePermission> {}

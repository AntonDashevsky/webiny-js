import { getAuditObject } from "~/utils/getAuditObject.js";
import { apps } from "@webiny/common-audit-logs/index.js";

export const AUDIT = getAuditObject(apps);

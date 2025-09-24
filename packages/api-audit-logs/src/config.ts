import { getAuditObject } from "~/utils/getAuditObject";
import { apps } from "@webiny/common-audit-logs";

export const AUDIT = getAuditObject(apps);

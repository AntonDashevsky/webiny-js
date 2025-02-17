import { PluginCollection } from "@webiny/plugins/types.js";
import installation from "./installation.js";
import permissionRenderer from "./permissionRenderer/index.js";
import secureRouteError from "~/plugins/secureRouteError.js";

export default (): PluginCollection => [installation, permissionRenderer, secureRouteError];

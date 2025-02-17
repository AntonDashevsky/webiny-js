import install from "./install.js";
import permissionRenderer from "./permissionRenderer/index.js";
import apolloLink from "./apolloLink.js";
import localeTypes from "./localeTypes.js";

export default () => [permissionRenderer, install, apolloLink, localeTypes];

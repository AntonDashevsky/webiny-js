import header from "./pageDetails/header/index.js";
import revisionContent from "./pageDetails/revisionContent/index.js";
import previewContent from "./pageDetails/previewContent/index.js";
import pageRevisions from "./pageDetails/pageRevisions/index.js";
import menuItems from "./menuItems/index.js";
import globalSearch from "./globalSearch/index.js";
import routes from "./routes.js";
import installation from "./installation.js";
import permissionRenderer from "./permissionRenderer/index.js";
import icons from "./icons/index.js";

export default () => [
    header,
    revisionContent,
    previewContent,
    pageRevisions,
    menuItems,
    globalSearch,
    routes,
    installation,
    permissionRenderer,
    icons
];

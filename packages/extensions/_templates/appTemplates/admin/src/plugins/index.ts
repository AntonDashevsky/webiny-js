import { plugins } from "@webiny/plugins";
import pageBuilderPlugins from "./pageBuilder";
import headlessCmsPlugins from "./headlessCms";
import theme from "theme";

// Imports plugins created via scaffolding utilities.
import scaffoldsPlugins from "./scaffolds";

plugins.register([
    /**
     * Page Builder app plugins.
     */
    pageBuilderPlugins,
    /**
     * Headless CMS app plugins.
     */
    headlessCmsPlugins,
    /**
     * App theme controls page builder and form builder layouts, styles, etc.
     */
    theme(),
    /**
     * Plugins created via scaffolding utilities.
     */
    scaffoldsPlugins()
]);

import "tsx/esm";
import path from "path";

const buildOverrides = JSON.parse(process.argv[2]);
const webinyConfigPath = path.join(process.cwd(), "webiny.config.js");

const { default: webinyConfigTs } = await import(webinyConfigPath);

await webinyConfigTs.commands.build({
    // We don't want debug nor regular logs logged within the build command.
    logs: false,
    debug: false,
    overrides: buildOverrides
});

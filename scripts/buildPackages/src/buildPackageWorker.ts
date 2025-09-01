import "tsx/esm";
import path from "path";
import { serializeError } from "serialize-error";

try {
    const buildOverrides = JSON.parse(process.argv[2]);
    const webinyConfigPath = path.join(process.cwd(), "webiny.config.js");

    const { default: webinyConfigTs } = await import(webinyConfigPath);

    await webinyConfigTs.commands.build({
        overrides: buildOverrides
    });
} catch (e) {
    if (process.send) {
        process.send({ error: serializeError(e) });
    }
}

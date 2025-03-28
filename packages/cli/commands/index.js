import about from "./about/index.js";
import run from "./run/index.js";
import telemetry from "./telemetry/index.js";
import upgrade from "./upgrade/index.js";

export const createCommands = async (yargs, context) => {
    context.plugins.register(about, run, telemetry, upgrade);

    // TODO: @esm
    // try {
    //     const wcp = await import("./wcp/index.js");
    //     context.plugins.register(wcp);
    // } catch (e) {
    //     console.log(e);
    //     // Skip WCP command
    // }

    await context.loadUserPlugins();

    context.plugins.byType("cli-command").forEach(plugin => {
        plugin.create({ yargs, context });
    });
};

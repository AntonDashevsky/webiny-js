import "tsx";
import { requireConfigWithExecute } from "~/utils/index.js";

const workerData = JSON.parse(process.argv[2]);
const { package: pkg, env, variant, region, debug } = workerData;

const options = { cwd: pkg.paths.packageFolder, env, variant, region, debug };

const config = await requireConfigWithExecute(pkg.paths.webinyConfigFile, {
    options
});

const hasWatch = config.commands && typeof config.commands.watch === "function";
if (hasWatch) {
    await config.commands.watch(options, {});
} else {
    throw new Error("Watch command not found.");
}

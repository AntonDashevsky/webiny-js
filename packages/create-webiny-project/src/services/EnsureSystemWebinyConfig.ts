import os from "os";
import path from "path";
import readJson from "load-json-file";
import writeJson from "write-json-file";

const configPath = path.join(os.homedir(), ".webiny", "config");

export class EnsureSystemWebinyConfig {
    execute() {
        // Check user ID
        try {
            const config = readJson.sync<Record<string, any>>(configPath);
            if (!config.id) {
                throw Error("Invalid Webiny config.");
            }
        } catch (e) {
            const { v4: uuidv4 } = require("uuid");
            // A new config file is written if it doesn't exist or is invalid.
            writeJson.sync(configPath, { id: uuidv4(), telemetry: true });
        }
    }
}

import pino from "pino";

export const logger = pino({
    name: "Website Builder SDK",
    level: "debug",
    transport: {
        target: "pino-pretty"
    }
});

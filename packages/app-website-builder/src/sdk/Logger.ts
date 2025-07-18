import pino from "pino";

export const logger = pino({
    name: "Website Builder SDK",
    level: "silent"
    /*transport: {
        target: "pino-pretty"
    }*/
});

// import pino from "pino";

// export const logger = pino({
//     name: "Website Builder SDK",
//     level: "silent",
//     transport: {
//         target: "pino-pretty"
//     }
// });

export const logger = {
    debug: console.debug,
    info: console.info,
    warn: console.warn
};

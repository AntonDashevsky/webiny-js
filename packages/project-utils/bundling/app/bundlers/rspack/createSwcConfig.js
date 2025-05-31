// See https://swc.rs/docs/configuration/swcrc.
const createSwcConfig = cwd => {
    return {
        jsc: {
            parser: {
                syntax: "typescript"
            },
            baseUrl: cwd,
            paths: {
                "~/*": ["src/*"],
                "~": ["src"]
            }
        },
        module: {
            type: "commonjs"
        },
        env: {
            "env": {
                "targets": "> 0.25%, not dead"
            }
        }
    };
};

module.exports = { createSwcConfig };

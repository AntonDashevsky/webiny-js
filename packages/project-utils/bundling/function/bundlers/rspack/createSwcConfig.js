// See https://swc.rs/docs/configuration/swcrc.
export const createSwcConfig = cwd => {
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
            targets: {
                node: "20"
            }
        }
    };
};

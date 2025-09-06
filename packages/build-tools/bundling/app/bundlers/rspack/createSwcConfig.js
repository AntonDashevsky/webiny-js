// See https://swc.rs/docs/configuration/swcrc.
export const createSwcConfig = cwd => {
    return {
        jsc: {
            parser: {
                syntax: "typescript",
                tsx: true,
                jsx: true
            },
            experimental: {
                plugins: [
                    [
                        "@swc/plugin-emotion",
                        {
                            autoLabel: "dev-only"
                        }
                    ]
                ]
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
            targets: "> 0.25%, not dead"
        }
    };
};

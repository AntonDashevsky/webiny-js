export default ({ path }) => {
    return {
        presets: ["@babel/preset-typescript"],
        plugins: [
            [
                "babel-plugin-module-resolver",
                {
                    cwd: path,
                    alias: {
                        "~": "./src"
                    }
                }
            ]
        ]
    };
};

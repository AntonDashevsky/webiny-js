import path from "path";

const getDefaults = ({ cwd, app }) => {
    let outputPath = path.join(cwd, "build");
    if (app) {
        outputPath = path.join(app.paths.workspaceFolder.absolute, "build");
    }

    return {
        outputPath,
        outputFilename: "handler.js"
    };
};

export const getOutput = options => {
    let output = null;
    if (options.overrides && options.overrides.output) {
        output = options.overrides.output;
    }

    if (!output) {
        output = {};
    }

    const defaults = getDefaults(options);
    if (!output.path) {
        output.path = defaults.outputPath;
    }

    if (!output.filename) {
        output.filename = defaults.outputFilename;
    }

    output.path = path.resolve(output.path);

    return output;
};

export const getEntry = ({ cwd, overrides }) => {
    return overrides.entry || path.join(cwd, "src/index");
};

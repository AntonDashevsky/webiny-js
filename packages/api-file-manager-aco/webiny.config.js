const { createWatchPackage, createBuildPackage } = require("@webiny/build-tools");

module.exports = {
    commands: {
        build: createBuildPackage({ cwd: __dirname }),
        watch: createWatchPackage({ cwd: __dirname })
    }
};

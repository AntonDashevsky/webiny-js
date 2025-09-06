export class BaseAppBundler {
    bundlerConfig = {};

    async build() {
        throw new Error("Method not implemented.");
    }

    async watch() {
        throw new Error("Method not implemented.");
    }

    setBundlerConfig(config) {
        if (typeof config === "function") {
            this.bundlerConfig = config(this.bundlerConfig);
        }

        this.bundlerConfig = config;
    }

    getBundlerConfig() {
        return this.bundlerConfig;
    }
}

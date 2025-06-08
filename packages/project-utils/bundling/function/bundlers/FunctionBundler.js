import { RspackBundler } from "./RspackBundler.js";
import { BaseFunctionBundler } from "./BaseFunctionBundler.js";

export class FunctionBundler extends BaseFunctionBundler {
    constructor(params) {
        super();
        this.params = params;
    }

    async build() {
        const BundlerClass = await this.getBundlerClass();
        const bundler = new BundlerClass(this.params);
        return bundler.build();
    }

    async watch() {
        const Bundler = await this.getBundlerClass();
        return new Bundler(this.params).watch();
    }

    async getBundlerClass() {
        return RspackBundler;
    }
}

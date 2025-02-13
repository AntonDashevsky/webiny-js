import { featureFlags } from "@webiny/feature-flags";
import { RspackBundler } from "./RspackBundler.js";
import { WebpackBundler } from "./WebpackBundler.js";
import { BaseFunctionBundler } from "./BaseFunctionBundler.js";

export class FunctionBundler extends BaseFunctionBundler {
    constructor(params) {
        super();
        this.params = params;
    }

    build() {
        const BundlerClass = this.getBundlerClass();
        const bundler = new BundlerClass(this.params);
        return bundler.build();
    }

    watch() {
        const Bundler = this.getBundlerClass();
        return new Bundler(this.params).watch();
    }

    getBundlerClass() {
        if (featureFlags.rspack) {
            return RspackBundler;
        }

        return WebpackBundler;
    }
}

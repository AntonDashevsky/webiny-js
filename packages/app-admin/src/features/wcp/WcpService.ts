// features/Wcp/WcpService.ts
import { makeAutoObservable, runInAction } from "mobx";
import { createImplementation } from "@webiny/di-container";
import { LocalStorageService } from "@webiny/app/features/localStorage";
import { EnvConfig } from "@webiny/app/features/envConfig";
import { License, NullLicense } from "@webiny/wcp";
import type { ILicense, DecryptedWcpProjectLicense } from "@webiny/wcp/types";
import { WcpService as Abstraction, WcpGateway } from "./abstractions";
import { ReactLicense } from "./ReactLicense";
import type { WcpFeatureName } from "~/features/wcp/types.js";

const LOCAL_STORAGE_KEY = "wcp/project";

class WcpServiceImpl implements Abstraction.Interface {
    private project: ILicense = new ReactLicense(new NullLicense());
    private loaded = false;

    constructor(
        private gateway: WcpGateway.Interface,
        private localStorage: LocalStorageService.Interface,
        private envConfig: EnvConfig.Interface
    ) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.initializeFromLocalStorage();
    }

    private initializeFromLocalStorage(): void {
        // If WCP is not configured, use NullLicense
        if (!this.envConfig.get("wcpProjectId")) {
            this.loaded = true;
            return;
        }

        // Try to load from localStorage
        try {
            const cachedData = this.localStorage.get<DecryptedWcpProjectLicense>(LOCAL_STORAGE_KEY);
            if (cachedData) {
                this.project = new ReactLicense(License.fromLicenseDto(cachedData));
            }
        } catch (error) {
            console.warn("Failed to load WCP project from localStorage:", error);
        }

        /* Load WCP project in the background. */
        this.loadProject();
    }

    getProject(): ILicense {
        return this.project;
    }

    isLoaded(): boolean {
        return this.loaded;
    }

    canUseFeature(featureName: WcpFeatureName): boolean {
        if (!this.project) {
            return false;
        }
        return this.project.canUseFeature(featureName);
    }

    async loadProject(): Promise<void> {
        // If WCP is not configured, nothing to load
        if (!this.envConfig.get("wcpProjectId")) {
            return;
        }

        try {
            const data = await this.gateway.fetchProject();

            if (!data) {
                throw new Error("No WCP project data received");
            }

            const license = new ReactLicense(License.fromLicenseDto(data));

            runInAction(() => {
                this.project = license;
                this.loaded = true;
            });

            // Cache in localStorage
            this.localStorage.set(LOCAL_STORAGE_KEY, data);
        } catch (error) {
            console.error("Failed to load WCP project:", error);

            // If we have cached data, we're still "loaded"
            runInAction(() => {
                this.loaded = this.project !== null;
            });

            throw error;
        }
    }
}

export const WcpService = createImplementation({
    abstraction: Abstraction,
    implementation: WcpServiceImpl,
    dependencies: [WcpGateway, LocalStorageService, EnvConfig]
});

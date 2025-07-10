import { ServiceDiscovery } from "@webiny/api";

export const getAppUrl = async () => {
    const manifest = await ServiceDiscovery.load();
    if (!manifest) {
        return null;
    }
    return manifest.admin?.cloudfront?.domainName;
};

import { getApiUrl } from "./getApiUrl.js";
import { getLocaleCode } from "./getLocaleCode.js";

export const getHeadlessCmsGqlApiUrl = (): { preview: string; read: string; manage: string } => {
    const locale = getLocaleCode();
    return {
        preview: getApiUrl(`/cms/preview/${locale}`),
        read: getApiUrl(`/cms/read/${locale}`),
        manage: getApiUrl(`/cms/manage/${locale}`)
    };
};

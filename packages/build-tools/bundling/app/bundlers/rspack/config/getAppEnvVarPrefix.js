export const getAppEnvVarPrefix = appPath => {
    if (appPath.includes("apps/core")) {
        return "WEBINY_CORE_";
    }
    if (appPath.includes("apps/api")) {
        return "WEBINY_API_";
    }

    if (appPath.includes("apps/admin")) {
        return "WEBINY_ADMIN_";
    }

    if (appPath.includes("apps/website")) {
        return "WEBINY_WEBSITE_";
    }

    return "";
};

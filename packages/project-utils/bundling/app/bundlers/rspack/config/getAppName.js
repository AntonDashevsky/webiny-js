export const getAppName = appPath => {
    if (appPath.includes("apps/core")) {
        return "Core";
    }
    if (appPath.includes("apps/api")) {
        return "API";
    }

    if (appPath.includes("apps/admin")) {
        return "Admin";
    }

    if (appPath.includes("apps/website")) {
        return "Website";
    }

    return "";
};

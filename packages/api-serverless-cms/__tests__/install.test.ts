import { describe, it, expect, beforeEach } from "vitest";
import { useGraphQlHandler } from "./handlers/graphQlHandler";

describe("install", { timeout: 90000 }, () => {
    beforeEach(async () => {
        process.env.S3_BUCKET = "a-mock-s3-bucket-which-does-not-exist";
    });

    const wcpOptions = ["on", "off"];

    it.each(wcpOptions)("should validate that no app is installed - wcp %s", async wcp => {
        const {
            isAdminUsersInstalled,
            isTenancyInstalled,
            isSecurityInstalled,
            isHeadlessCmsInstalled,
            isLocaleInstalled
        } = useGraphQlHandler({
            path: "/graphql",
            features: wcp === "on"
        });

        const [isAdminUsersInstalledResult] = await isAdminUsersInstalled();

        expect(isAdminUsersInstalledResult).toEqual({
            data: {
                adminUsers: {
                    version: null
                }
            }
        });

        const [isTenancyInstalledResult] = await isTenancyInstalled();
        expect(isTenancyInstalledResult).toEqual({
            data: {
                tenancy: {
                    version: null
                }
            }
        });

        const [isSecurityInstalledResult] = await isSecurityInstalled();
        expect(isSecurityInstalledResult).toEqual({
            data: {
                security: {
                    version: null
                }
            }
        });

        const [isLocaleInstalledResult] = await isLocaleInstalled();
        expect(isLocaleInstalledResult).toEqual({
            data: {
                i18n: {
                    version: null
                }
            }
        });

        const [isHeadlessCmsInstalledResult] = await isHeadlessCmsInstalled();

        expect(isHeadlessCmsInstalledResult).toEqual({
            data: {
                cms: {
                    version: null
                }
            }
        });
    });

    it.each(wcpOptions)("should install system - wcp %s", async wcp => {
        const {
            installSecurity,
            installTenancy,
            installAdminUsers,
            installPageBuilder,
            installHeadlessCms,
            installI18N,
            login,
            isAdminUsersInstalled,
            isTenancyInstalled,
            isSecurityInstalled,
            isHeadlessCmsInstalled,
            isPageBuilderInstalled,
            isLocaleInstalled
        } = useGraphQlHandler({
            path: "/graphql",
            features: wcp === "on"
        });
        const [installTenancyResult] = await installTenancy();
        expect(installTenancyResult).toEqual({
            data: {
                tenancy: {
                    install: {
                        data: true,
                        error: null
                    }
                }
            }
        });

        const [installSecurityResult] = await installSecurity();
        expect(installSecurityResult).toEqual({
            data: {
                security: {
                    install: {
                        data: true,
                        error: null
                    }
                }
            }
        });

        login();

        const [installAdminUsersResult] = await installAdminUsers();
        expect(installAdminUsersResult).toEqual({
            data: {
                adminUsers: {
                    install: {
                        data: true,
                        error: null
                    }
                }
            }
        });

        const [installI18NResult] = await installI18N({
            variables: {
                data: {
                    code: "en-US"
                }
            }
        });
        expect(installI18NResult).toEqual({
            data: {
                i18n: {
                    install: {
                        data: true,
                        error: null
                    }
                }
            }
        });

        const [installCmsResult] = await installHeadlessCms();
        expect(installCmsResult).toEqual({
            data: {
                cms: {
                    install: {
                        data: true,
                        error: null
                    }
                }
            }
        });

        const [isAdminUsersInstalledResult] = await isAdminUsersInstalled();

        expect(isAdminUsersInstalledResult).toEqual({
            data: {
                adminUsers: {
                    version: "true"
                }
            }
        });

        const [isTenancyInstalledResult] = await isTenancyInstalled();
        expect(isTenancyInstalledResult).toEqual({
            data: {
                tenancy: {
                    version: "true"
                }
            }
        });

        const [isSecurityInstalledResult] = await isSecurityInstalled();
        expect(isSecurityInstalledResult).toEqual({
            data: {
                security: {
                    version: "true"
                }
            }
        });

        const [isLocaleInstalledResult] = await isLocaleInstalled();
        expect(isLocaleInstalledResult).toEqual({
            data: {
                i18n: {
                    version: "true"
                }
            }
        });

        const [isHeadlessCmsInstalledResult] = await isHeadlessCmsInstalled();

        expect(isHeadlessCmsInstalledResult).toEqual({
            data: {
                cms: {
                    version: "true"
                }
            }
        });
    });
});

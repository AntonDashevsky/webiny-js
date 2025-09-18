import { z } from "zod";
import { defineExtension } from "@webiny/project/defineExtension/index.js";

export const adminCustomDomains = defineExtension({
    type: "Infra/Admin/CustomDomains",
    tags: { runtimeContext: "project" },
    description: "Configure custom domains for the Admin app.",
    paramsSchema: z.object({
        domains: z.array(z.string()).describe("List of custom domains.").min(1),
        sslMethod: z
            .enum(["sni-only", "vip"])
            .describe("The method to use for SSL/TLS certificate validation.")
            .default("sni-only"),
        certificateArn: z
            .string()
            .describe("The ARN of the SSL/TLS certificate to use for the custom domains.")
    })
});

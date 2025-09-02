import type { CreateBlueGreenPulumiAppParams } from "~/pulumi/apps/blueGreen/createBlueGreenPulumiApp.js";
import { createBlueGreenPulumiApp } from "~/pulumi/apps/blueGreen/createBlueGreenPulumiApp.js";
import type { PluginCollection } from "@webiny/plugins/types.js";
export interface CreateBlueGreenAppParams extends CreateBlueGreenPulumiAppParams {
    plugins?: PluginCollection;
}

// export interface IEnvironment {
//     name: string;
//     env: string;
//     variant: string | undefined;
//     domains: {
//         [key: string]: string;
//     };
// }

// const builtInPlugins: Plugin[] = [
//     createBeforeDeployPlugin(async ({ env, variant }, context) => {
//         if (!variant?.length) {
//             return;
//         }
//         const message = `Cannot deploy Blue / Green system environment (${env}) with a variant (${variant}).`;
//         context.error(message);
//         throw new Error(message);
//     }),
//     createAfterDeployPlugin(async ({ env }) => {
//         const bg = await getStackOutput<IBlueGreenStackOutput>({
//             app: "blueGreen",
//             env,
//             /**
//              * Blue / Green system cannot have any variants.
//              */
//             variant: undefined
//         });
//
//         if (!bg) {
//             return;
//         }
//
//         const domains = Array.isArray(bg.domains) ? bg.domains : [];
//
//         const environments = (bg.environments || []).reduce<IEnvironment[]>((items, item) => {
//             const index = items.findIndex(i => i.name === item.name);
//             if (index >= 0) {
//                 items[index].domains[item.type] = item.target;
//
//                 return items;
//             }
//
//             items.push({
//                 name: item.name,
//                 env: item.env,
//                 variant: item.variant,
//                 domains: {
//                     [item.type]: item.target
//                 }
//             });
//
//             return items;
//         }, []);
//
//         const output = [
//             "",
//             green(`Blue / Green Router`),
//             `‣ Environment name: ${blue(env)}`,
//             `‣ CloudFront domain: ${bg.distributionDomain}`,
//             `‣ CloudFront URL: ${bg.distributionUrl}`,
//             "",
//             `‣ Domains attached: `,
//             ...domains.map(domain => `  - https://${domain}`),
//             "",
//             `‣ Environments: `,
//             ...environments.map(item => {
//                 const envVariant = `env: ${item.env}${
//                     item.variant ? ` / variant: ${item.variant}` : ""
//                 }`;
//                 return [
//                     `  - ${blue(item.name)} (${envVariant})`,
//                     ...Object.keys(item.domains).map(type => {
//                         return `    - ${type}: https://${item.domains[type]}`;
//                     })
//                 ].join("\n");
//             }),
//             ""
//         ];
//         console.log(output.join("\n"));
//     })
// ];

export function createBlueGreenApp(projectAppParams: CreateBlueGreenAppParams) {
    // const plugins = projectAppParams.plugins ? [...projectAppParams.plugins] : [];

    return {
        id: "blueGreen",
        name: "Blue / Green System",
        description: "Your project's Blue / Green system.",
        cli: {
            // Default args for the "yarn webiny watch ..." command (we don't need the deploy option while developing).
            watch: {
                // We disable local development for all AWS Lambda functions.
                // This can be changed down the line by passing another set of values
                // to the "watch" command (for example `-f ps-render-subscriber`).
                function: "none"
            }
        },
        pulumi: createBlueGreenPulumiApp(projectAppParams)
        // plugins: plugins.concat([builtInPlugins])
    };
}

import { createImplementation } from "@webiny/di-container";
import {
    ListAppLambdaFunctionsService,
    PulumiGetStackExportService,
    LoggerService
} from "~/abstractions/index.js";
import { AppModel } from "~/models/index.js";
import path from "path";
import minimatch from "minimatch";

interface ExpectedStackExport {
    deployment: {
        resources: Array<{
            type: string;
            inputs: {
                name: string;
                code: {
                    assets: Record<string, { path: string }>;
                };
            };
        }>;
    };
}

export class DefaultListAppLambdaFunctions implements ListAppLambdaFunctionsService.Interface {
    constructor(
        private pulumiGetStackExportService: PulumiGetStackExportService.Interface,
        private loggerService: LoggerService.Interface
    ) {}

    async execute(app: AppModel, params: ListAppLambdaFunctionsService.Params) {
        const stackExport = await this.pulumiGetStackExportService.execute<ExpectedStackExport>(
            app,
            params
        );

        if (!stackExport) {
            // If no stack export is found, return an empty array. This is a valid scenario.
            // For example, watching the Admin app locally, but not deploying it.
            return {
                list: [],
                meta: {
                    count: 0,
                    totalCount: 0
                }
            };
        }

        const allFunctionsList = stackExport.deployment.resources
            .filter(r => r.type === "aws:lambda/function:Function")
            // We don't need to watch the authorizer function.
            .filter(resource => {
                const isAuthorizerFunction = resource.inputs.name.includes(
                    "watch-command-iot-authorizer"
                );
                return !isAuthorizerFunction;
            });

        let functionsList = allFunctionsList
            // This filter ensures that Lambda@Edge functions are excluded. It also ensures a
            // functions is filtered out if a `pulumi refresh` was called, because, when called,
            // the paths in Pulumi state file disappear, and we can't determine the path to the handler.
            .filter(resource => {
                return "." in resource.inputs.code.assets;
            })
            .map(resource => {
                const fnName = resource.inputs.name;
                const handlerBuildFolderPath = resource.inputs.code.assets["."].path;
                const handlerPath = path.join(handlerBuildFolderPath, "handler.js");
                return {
                    name: fnName,
                    path: handlerPath
                };
            });

        if (params.whitelist) {
            const functionNamesToMatch = Array.isArray(params.whitelist)
                ? params.whitelist
                : [params.whitelist];

            // `functionNamesToWatch` is an array of glob patterns, which denote which functions to watch.
            functionsList = functionsList.filter(fn => {
                return functionNamesToMatch.some(pattern => {
                    if (pattern.includes("*")) {
                        return minimatch(fn.name, pattern);
                    }

                    return fn.name.includes(pattern);
                });
            });
        }

        return {
            list: functionsList,
            meta: { count: functionsList.length, totalCount: allFunctionsList.length }
        };
    }
}

export const listAppLambdaFunctions = createImplementation({
    abstraction: ListAppLambdaFunctionsService,
    implementation: DefaultListAppLambdaFunctions,
    dependencies: [PulumiGetStackExportService, LoggerService]
});

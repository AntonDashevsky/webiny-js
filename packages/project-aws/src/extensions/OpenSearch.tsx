import React from "react";
import { OpenSearch as BaseOpenSearch } from "~/pulumi/extensions/index.js";
import { Infra } from "~/index.js";
import { createPathResolver } from "@webiny/project";

const p = createPathResolver(import.meta.dirname, "OpenSearch");

export const OpenSearch = (props: React.ComponentProps<typeof BaseOpenSearch>) => {
    return (
        <>
            <BaseOpenSearch {...props} />
            {props.enabled && (
                <>
                    <Infra.Core.BeforeBuild src={p("InjectDdbEsLambdaFnHandler.js")} />
                    <Infra.Api.BeforeBuild src={p("ReplaceApiLambdaFnHandlers.js")} />
                    <Infra.Core.BeforeDeploy src={p("EnsureOsServiceRoleBeforeCoreDeploy.js")} />
                </>
            )}
        </>
    );
};

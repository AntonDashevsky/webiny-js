import React from "react";
import { ElasticSearch as BaseElasticSearch } from "~/pulumi/extensions/index.js";
import { Infra } from "~/index.js";
import { createPathResolver } from "@webiny/project";

const p = createPathResolver(import.meta.dirname, "ElasticSearch");

export const ElasticSearch = (props: React.ComponentProps<typeof BaseElasticSearch>) => {
    return (
        <>
            <BaseElasticSearch {...props} />
            {props.enabled && (
                <>
                    <Infra.Core.BeforeBuild src={p("InjectDdbEsLambdaFnHandler.js")} />
                    <Infra.Api.BeforeBuild src={p("ReplaceApiLambdaFnHandlers.js")} />
                    <Infra.Core.BeforeDeploy src={p("EnsureEsServiceRoleBeforeCoreDeploy.js")} />
                </>
            )}
        </>
    );
};

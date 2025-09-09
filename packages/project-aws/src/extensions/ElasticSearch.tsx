import React from "react";
import { ElasticSearch as BaseElasticSearch } from "~/pulumi/extensions/index.js";
import { Infra } from "~/index.js";
import path from "path";

export const ElasticSearch = (props: React.ComponentProps<typeof BaseElasticSearch>) => {
    return (
        <>
            <BaseElasticSearch {...props} />
            {props.enabled && (
                <>
                    <Infra.Core.BeforeBuild
                        src={path.join(
                            import.meta.dirname,
                            "ElasticSearch",
                            "injectDdbEsLambdaFnHandler.js"
                        )}
                    />
                    <Infra.Api.BeforeBuild
                        src={path.join(
                            import.meta.dirname,
                            "ElasticSearch",
                            "replaceApiLambdaFnHandlers.js"
                        )}
                    />
                </>
            )}
        </>
    );
};

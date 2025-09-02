import React from "react";
import { ElasticSearch as BaseElasticSearch } from "~/pulumi/extensions/index.js";
import { Core, Api } from "~/index.js";
import path from "path";

export const ElasticSearch = (props: React.ComponentProps<typeof BaseElasticSearch>) => {
    return (
        <>
            <BaseElasticSearch {...props} />
            {props.enabled && (
                <>
                    <Core.BeforeBuild
                        src={path.join(
                            import.meta.dirname,
                            "ElasticSearch",
                            "injectDdbEsLambdaFnHandler.js"
                        )}
                    />
                    <Api.BeforeBuild
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

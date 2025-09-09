import React from "react";
import { OpenSearch as BaseOpenSearch } from "~/pulumi/extensions/index.js";
import { Infra } from "~/index.js";
import path from "path";

export const OpenSearch = (props: React.ComponentProps<typeof BaseOpenSearch>) => {
    return (
        <>
            <BaseOpenSearch {...props} />
            {props.enabled && (
                <>
                    <Infra.Core.BeforeBuild
                        src={path.join(
                            import.meta.dirname,
                            "OpenSearch",
                            "injectDdbEsLambdaFnHandler.js"
                        )}
                    />
                    <Infra.Api.BeforeBuild
                        src={path.join(
                            import.meta.dirname,
                            "OpenSearch",
                            "replaceApiLambdaFnHandlers.js"
                        )}
                    />
                </>
            )}
        </>
    );
};

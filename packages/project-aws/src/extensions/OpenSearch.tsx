import React from "react";
import { OpenSearch as BaseOpenSearch } from "~/pulumi/extensions/index.js";
import { Core, Api } from "~/index.js";
import path from "path";

export const OpenSearch = (props: React.ComponentProps<typeof BaseOpenSearch>) => {
    return (
        <>
            <BaseOpenSearch {...props} />
            {props.enabled && (
                <>
                    <Core.BeforeBuild
                        src={path.join(
                            import.meta.dirname,
                            "OpenSearch",
                            "injectDdbEsLambdaFnHandler.js"
                        )}
                    />
                    <Api.BeforeBuild
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

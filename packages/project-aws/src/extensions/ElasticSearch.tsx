import React from "react";
import { ElasticSearch as BaseElasticSearch } from "@webiny/pulumi-aws/extensions/index.js";
import { Core } from "~/index.js";
import path from "path";

export const ElasticSearch = (props: React.ComponentProps<typeof BaseElasticSearch>) => {
    return (
        <>
            <BaseElasticSearch {...props} />
            {props.enabled && (
                <Core.BeforeBuild
                    src={path.join(import.meta.dirname, "ElasticSearch", "createDdbEsHandler.js")}
                />
            )}
        </>
    );
};

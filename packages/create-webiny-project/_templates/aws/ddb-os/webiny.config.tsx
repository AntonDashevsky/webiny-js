import React from "react";
import { Webiny, Project } from "@webiny/extensions";

export default () => {
    return (
        <>
            <Webiny />
            <Infra.OpenSearch enabled={true} />
        </>
    );
};

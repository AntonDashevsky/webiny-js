import React from "react";
import { Webiny, Project } from "@webiny/extensions";

export default () => {
    return (
        <>
            <Webiny />
            <Project.OpenSearch enabled={true} />
        </>
    );
};

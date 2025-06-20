import React from "react";
import { Grid } from "@webiny/admin-ui";
import type { InputAstNode } from "~/sdk/ComponentManifestToAstConverter";
import { InputField } from "./InputField";
import type { DocumentElementBindings } from "~/sdk/types";

export const InputRenderer = ({
    ast,
    bindings
}: {
    ast: InputAstNode[];
    bindings: DocumentElementBindings["inputs"];
}) => {
    return (
        <>
            {ast.map(node =>
                node.input.hideFromUi ? null : (
                    <Grid.Column span={12} key={node.path}>
                        <InputField key={node.path} node={node} bindings={bindings} />
                    </Grid.Column>
                )
            )}
        </>
    );
};

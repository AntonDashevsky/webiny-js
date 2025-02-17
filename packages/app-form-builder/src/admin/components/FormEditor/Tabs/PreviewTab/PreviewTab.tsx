import React from "react";
import { css } from "emotion";
import { useFormEditor } from "../../Context/index.js";
import { Elevation } from "@webiny/ui/Elevation/index.js";
import { Form } from "../../../../../components/Form/index.js";

const formPreviewWrapper = css({
    padding: 40,
    backgroundColor: "var(--webiny-theme-color-surface, #fff) !important",
    margin: 40,
    boxSizing: "border-box"
});

export const PreviewTab = () => {
    const { data } = useFormEditor();

    return (
        <Elevation z={1} className={formPreviewWrapper}>
            <Form preview data={data} />
        </Elevation>
    );
};

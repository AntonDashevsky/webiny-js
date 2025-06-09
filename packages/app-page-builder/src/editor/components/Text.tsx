import React from "react";
import { type CoreOptions } from "medium-editor";

import { PeText } from "./Text/PeText.js";

interface TextElementProps {
    elementId: string;
    mediumEditorOptions?: CoreOptions;
    rootClassName?: string;
    tag?: string | [string, Record<string, any>];
}

const Text = (props: TextElementProps) => {
    return <PeText {...props} />;
};

export default React.memo(Text);

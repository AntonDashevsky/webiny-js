import React from "react";
import { Input } from "@webiny/ui/Input/index.js";
import { validation } from "@webiny/validation";
import { useBind } from "@webiny/form";
import { useFile, useFileManagerApi } from "~/index.js";

export const Name = () => {
    const { file } = useFile();
    const { canEdit } = useFileManagerApi();
    const bind = useBind({
        name: "name",
        validators: [validation.create("required")]
    });

    return (
        <Input
            {...bind}
            label={"Name"}
            disabled={!canEdit(file)}
            autoFocus
            placeholder={"Enter name"}
            description={"A descriptive name is easier to remember."}
        />
    );
};

import { useEffect } from "react";
import { plugins } from "@webiny/plugins";
import { fileField } from "./fileField.js";
import { singleFile } from "./fileRenderer/fileField.js";
import { multipleFiles } from "./fileRenderer/fileFields.js";

export const HeadlessCmsModule = () => {
    useEffect(() => {
        plugins.register(fileField, singleFile, multipleFiles);
    });

    return null;
};

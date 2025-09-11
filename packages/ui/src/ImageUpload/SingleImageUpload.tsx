import React from "react";
import type { FormComponentProps } from "~/types.js";
import { Alert } from "@webiny/admin-ui";

interface SingleImageUploadProps extends FormComponentProps {
    // Component label.
    label?: string;

    // Is component disabled?
    disabled?: boolean;

    // Description beneath the image.
    description?: string;

    // A className for the root element.
    className?: string;

    // Define a list of accepted image types.
    accept?: string[];

    // Define file's max allowed size (default is "10mb").
    // Uses "bytes" (https://www.npmjs.com/package/bytes) library to convert string notation to actual number.
    maxSize: string;

    // Image editor options.
    // Please check the docs of ImageEditor component for the list of all available options.
    imageEditor?: {
        [key: string]: any;
    };

    // Custom image preview renderer. By default images are rendered via simple <img> element.
    renderImagePreview?: () => React.ReactElement<any>;

    // Should remove image button (top right ✕) be shown? Default is set to `true`.
    showRemoveImageButton?: boolean;

    // Use these to customize error messages (eg. if i18n supported is needed).
    errorMessages: {
        maxSizeExceeded: string;
        unsupportedFileType: string;
        default: string;
        multipleNotAllowed: string;
        multipleMaxSizeExceeded: string;
    };
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please check the `FilePicker` component inside the `@webiny/admin-ui` package instead.
 */
export const SingleImageUpload = ({}: SingleImageUploadProps) => {
    return (
        <Alert type="danger" variant={"strong"}>
            {
                "Deprecated component! The original code has been moved to `@webiny/admin-ui` package."
            }
        </Alert>
    );
};

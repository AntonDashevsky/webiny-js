import React from "react";
import type { EmptyStateElement } from "./EmptyStateElement.js";
import type { UIRenderParams } from "~/ui/UIRenderer.js";
import { UIRenderer } from "~/ui/UIRenderer.js";
import * as Ui from "@webiny/ui/ImageUpload/index.js";
import { Image } from "@webiny/app/components/index.js";
import type { FileManagerElementRenderProps } from "~/ui/elements/form/FileManagerElement/FileManagerElementRenderer.js";
import { AddImageIconWrapper, AddImageWrapper, FilePreviewWrapper, RemoveImage } from "./styled.js";
import { ReactComponent as AddFileIcon } from "@webiny/icons/attach_file.svg";
import { ReactComponent as RemoveImageIcon } from "@webiny/icons/close.svg";
import { Typography } from "@webiny/ui/Typography/index.js";

export class EmptyStateElementRenderer extends UIRenderer<
    EmptyStateElement,
    FileManagerElementRenderProps
> {
    public override render({
        props
    }: UIRenderParams<EmptyStateElement, FileManagerElementRenderProps>): React.ReactNode {
        const accept = props.fileManagerElement.getAccept();
        const acceptsOnlyImages = !accept || accept.every(el => el.startsWith("image/"));

        if (acceptsOnlyImages) {
            return (
                <Ui.Image
                    placeholder={"Select an image"}
                    renderImagePreview={renderImageProps => <Image {...renderImageProps} />}
                    style={{ width: "100%", height: "auto" }}
                    value={props.value}
                    uploadImage={props.showFileManager}
                    removeImage={props.onChange}
                />
            );
        }

        if (props.value) {
            return (
                <FilePreviewWrapper>
                    <span>
                        Attached file: <strong>{props.value.src.split("/").pop()}</strong>
                    </span>

                    <RemoveImage onClick={() => props.onChange(null)}>
                        <RemoveImageIcon />
                    </RemoveImage>

                    <AddImageWrapper data-role={"select-file"} onClick={props.showFileManager}>
                        <AddImageIconWrapper>
                            <AddFileIcon />
                            <Typography use={"caption"}>Select a file</Typography>
                        </AddImageIconWrapper>
                    </AddImageWrapper>
                </FilePreviewWrapper>
            );
        }

        return (
            <AddImageWrapper data-role={"select-file"} onClick={props.showFileManager}>
                <AddImageIconWrapper>
                    <AddFileIcon />
                    <Typography use={"caption"}>Select a file</Typography>
                </AddImageIconWrapper>
            </AddImageWrapper>
        );
    }
}

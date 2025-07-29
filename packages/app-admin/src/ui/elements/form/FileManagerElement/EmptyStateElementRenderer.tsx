import React from "react";
import type { EmptyStateElement } from "./EmptyStateElement";
import type { UIRenderParams } from "~/ui/UIRenderer";
import { UIRenderer } from "~/ui/UIRenderer";
import * as Ui from "@webiny/ui/ImageUpload";
import { Image } from "@webiny/app/components";
import type { FileManagerElementRenderProps } from "~/ui/elements/form/FileManagerElement/FileManagerElementRenderer";
import { AddImageIconWrapper, AddImageWrapper, FilePreviewWrapper, RemoveImage } from "./styled";
import { ReactComponent as AddFileIcon } from "@webiny/icons/attach_file.svg";
import { ReactComponent as RemoveImageIcon } from "@webiny/icons/close.svg";
import { Typography } from "@webiny/ui/Typography";

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

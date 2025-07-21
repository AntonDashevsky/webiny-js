import React from "react";
import { FilePicker, FileItemDto } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";
import { FileManager, type FileManagerFileItem } from "@webiny/app-admin";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { FileInput } from "@webiny/website-builder-sdk";
import { fileManagerItemToValue } from "~/shared/fileManagerItemToValue";

export const FileInputRenderer = ({
    value,
    metadata,
    onChange,
    label,
    ...props
}: ElementInputRendererProps) => {
    const input = props.input as FileInput;
    const { isBaseBreakpoint } = useBreakpoint();
    const onFileChange = (file: FileManagerFileItem) => {
        onChange(({ value, metadata }) => {
            const newValue = fileManagerItemToValue(file);
            value.set(newValue);

            metadata.set("image", newValue);
        });
    };

    const onRemove = () => {
        onChange(({ value, metadata }) => {
            if (isBaseBreakpoint) {
                value.set(undefined);
            } else {
                value.set(null);
            }
            metadata.unset("image");
        });
    };

    const fileInfo = metadata.get<FileItemDto>("image");
    const preview = value ? fileInfo : undefined;

    return (
        <FileManager
            accept={input.allowedFileTypes}
            onChange={onFileChange}
            render={({ showFileManager }) => (
                <FilePicker
                    label={label}
                    description={input.description}
                    type="compact"
                    value={preview}
                    onSelectItem={() => showFileManager()}
                    onRemoveItem={onRemove}
                    onEditItem={() => showFileManager()}
                />
            )}
        />
    );
};

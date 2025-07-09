import React from "react";
import { FilePicker, FileItemDto } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";
import { FileManager } from "@webiny/app-admin";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { FileInput } from "~/sdk";

export const FileInputRenderer = ({
    value,
    metadata,
    onChange,
    label,
    ...props
}: ElementInputRendererProps) => {
    const input = props.input as FileInput;
    const { isBaseBreakpoint } = useBreakpoint();
    const onFileChange = (file: any) => {
        const metaItems = file.meta || [];
        const getName = () => {
            const nameItem = metaItems.find((item: { key: string }) => item.key === "name");
            return nameItem ? nameItem.value : "";
        };
        const getSize = () => {
            const sizeItem = metaItems.find((item: { key: string }) => item.key === "size");
            return sizeItem ? sizeItem.value : 0;
        };
        const getType = () => {
            const typeItem = metaItems.find((item: { key: string }) => item.key === "type");
            return typeItem ? typeItem.value : "";
        };

        onChange(({ value, metadata }) => {
            value.set({
                id: file.id,
                name: getName(),
                size: getSize(),
                mimeType: getType(),
                url: file.src || ""
            });

            metadata.set("image", {
                id: file.id,
                name: getName(),
                size: getSize(),
                mimeType: getType(),
                url: file.src || ""
            });
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

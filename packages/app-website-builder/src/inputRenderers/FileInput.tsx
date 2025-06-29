import React from "react";
import { FilePicker, FileItemDto } from "@webiny/admin-ui";
import { ElementInputRendererProps } from "~/BaseEditor";
import { FileManager } from "@webiny/app-admin";

export const FileInputRenderer = ({ metadata, onChange, label }: ElementInputRendererProps) => {
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
            value.set(file.src);

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
            value.set(undefined);
            metadata.unset("image");
        });
    };

    const fileInfo = metadata.get<FileItemDto>("image");

    return (
        <FileManager
            onChange={onFileChange}
            render={({ showFileManager }) => (
                <FilePicker
                    label={label}
                    description="Select a background image"
                    type="compact"
                    value={fileInfo ? fileInfo : undefined}
                    onSelectItem={() => showFileManager()}
                    onRemoveItem={onRemove}
                    onEditItem={() => showFileManager()}
                />
            )}
        />
    );
};

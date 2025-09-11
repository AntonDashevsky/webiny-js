import type { FileManagerFileItem } from "@webiny/app-admin";

export const fileManagerItemToValue = (file: FileManagerFileItem) => {
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

    return {
        id: file.id,
        name: getName(),
        size: getSize(),
        mimeType: getType(),
        src: file.src || ""
    };
};

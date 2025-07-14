import React from "react";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { Preview } from "./Preview";

export const DocumentPreview = () => {
    const { id } = useSelectFromDocument(document => {
        return { id: document.id };
    });

    return <Preview key={id} />;
};

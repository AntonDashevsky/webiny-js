import React from "react";
import type { CmsModel } from "~/types.js";
import { OptionsModelListItem } from "./OptionsModelListItem.js";

interface OptionsModelListProps {
    models: CmsModel[];
    onClick: (modelId: string) => void;
}

export const OptionsModelList = ({ models, onClick }: OptionsModelListProps) => {
    if (models.length <= 1) {
        return null;
    }

    return (
        <>
            {models.map(model => {
                return (
                    <OptionsModelListItem
                        onClick={onClick}
                        key={`model-${model.modelId}`}
                        model={model}
                    />
                );
            })}
        </>
    );
};

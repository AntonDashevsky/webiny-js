import React from "react";
import { type ImportModelData } from "../../types.js";
import styled from "@emotion/styled";
import { DataListModelItem } from "./DataListModelItem.js";
import { useImport } from "~/admin/views/contentModels/importing/useImport.js";

const Container = styled("div")({
    backgroundColor: "var(--mdc-theme-surface)",
    border: "1px dashed var(--mdc-theme-on-surface)",
    padding: "5px",
    borderBox: "box-sizing"
});

interface DataListModelsProps {
    models: ImportModelData[];
}

export const DataListModels = ({ models }: DataListModelsProps) => {
    const { toggleModel, isModelSelected } = useImport();
    return (
        <Container>
            {models.map(model => {
                return (
                    <DataListModelItem
                        key={`model-${model.id}`}
                        model={model}
                        toggle={toggleModel}
                        selected={isModelSelected(model)}
                    />
                );
            })}
        </Container>
    );
};

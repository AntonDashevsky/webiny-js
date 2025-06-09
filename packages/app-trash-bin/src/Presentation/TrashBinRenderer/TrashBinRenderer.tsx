import React from "react";
import { useAcoConfig } from "@webiny/app-aco";
import { Sorting } from "@webiny/app-utils";
import { type TrashBinItemDTO } from "~/Domain/index.js";
import { type TrashBinProps } from "~/Presentation/index.js";
import { TrashBin } from "../TrashBin/index.js";

export type TrashBinRendererProps = Omit<TrashBinProps, "render"> & {
    onClose: () => void;
    onItemAfterRestore: (item: TrashBinItemDTO) => void;
    retentionPeriod: number;
};

export const TrashBinRenderer = ({ title = "Trash Bin", ...props }: TrashBinRendererProps) => {
    const { table } = useAcoConfig();

    if (!table.sorting.length) {
        return null;
    }

    return (
        <TrashBin
            {...props}
            title={title}
            sorting={table.sorting.map(sort => Sorting.create(sort))}
        />
    );
};

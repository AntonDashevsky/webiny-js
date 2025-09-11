import type { DataListProps } from "../types.js";

const MultiSelectActions = (props: DataListProps) => {
    const { multiSelectActions } = props;
    if (!multiSelectActions) {
        return null;
    }
    return multiSelectActions;
};

export { MultiSelectActions };

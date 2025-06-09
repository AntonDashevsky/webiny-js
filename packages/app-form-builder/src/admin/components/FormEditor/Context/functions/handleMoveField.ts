import { type FbFormModel, type FbFormModelField, type DropTarget, type DropSource, type DropDestination } from "~/types.js";
import moveField from "./handleMoveField/moveField.js";
import moveFieldBetween from "./handleMoveField/moveFieldBetween.js";

interface HandleMoveField {
    data: FbFormModel;
    field: FbFormModelField | string;
    target: DropTarget;
    source: DropSource;
    destination: DropDestination;
}

export default ({ data, field, target, source, destination }: HandleMoveField) => {
    if (source.containerId === destination.containerId) {
        // This condition should cover:
        // 1. When we move field in scope of one Step;
        // 2. When we move field in scope of one Condition Group (Condition Group yet to be implemented).
        moveField({
            field,
            data,
            target,
            destination
        });
    } else {
        // This condition should cover:
        // 1. When we move field in scope of two different Steps;
        // 2. When we move field in scope of two different Condition Groups (Condition Group yet to be implemented).
        moveFieldBetween({
            data,
            field,
            target,
            source,
            destination
        });
    }
};

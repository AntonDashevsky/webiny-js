import { DragObjectWithTypeWithTarget } from "../../../components/Droppable.js";

export interface DropElementActionArgsType {
    source: DragObjectWithTypeWithTarget;
    target: {
        id: string;
        type: string;
        path?: string;
        position: number;
    };
}

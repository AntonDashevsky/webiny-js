import { useSelectFromEditor } from "./useSelectFromEditor";
import { Boxes } from "./Boxes";

export const usePreviewData = () => {
    const { viewport, boxes } = useSelectFromEditor(state => {
        return {
            viewport: state.viewport,
            boxes: state.boxes
        };
    });

    return {
        viewport,
        boxes: {
            preview: new Boxes(boxes.preview),
            editor: new Boxes(boxes.editor)
        }
    };
};

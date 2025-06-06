import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { StatePathsExtractor } from "~/BaseEditor/defaultConfig/Sidebar/ElementSettings/StatePathsExtractor";

export const useStateArrays = () => {
    return useSelectFromDocument(document => {
        return new StatePathsExtractor(document.state)
            .getPaths()
            .filter(option => option.type.isArray())
            .values();
    });
};

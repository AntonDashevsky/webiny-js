import { useContext } from "react";
import { UiContext, type UiContextValue } from "./../contexts/Ui/index.js";

export const useUi = () => {
    return useContext(UiContext) as UiContextValue;
};

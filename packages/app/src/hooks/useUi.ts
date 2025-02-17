import { useContext } from "react";
import { UiContext, UiContextValue } from "./../contexts/Ui/index.js";

export const useUi = () => {
    return useContext(UiContext) as UiContextValue;
};

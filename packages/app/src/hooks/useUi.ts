import { useContext } from "react";
import type { UiContextValue } from "~/contexts/Ui";
import { UiContext } from "~/contexts/Ui";

export const useUi = () => {
    return useContext(UiContext) as UiContextValue;
};

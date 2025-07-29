import { useContext } from "react";
import type { FormContextProvider } from "./FormsContext";
import { FormsContext } from "./FormsContext";

export function useForms(): FormContextProvider {
    return useContext(FormsContext);
}

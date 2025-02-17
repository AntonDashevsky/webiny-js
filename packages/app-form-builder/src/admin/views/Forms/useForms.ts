import { useContext } from "react";
import { FormContextProvider, FormsContext } from "./FormsContext.js";

export function useForms(): FormContextProvider {
    return useContext(FormsContext);
}

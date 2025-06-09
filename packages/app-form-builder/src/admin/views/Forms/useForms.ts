import { useContext } from "react";
import { type FormContextProvider, FormsContext } from "./FormsContext.js";

export function useForms(): FormContextProvider {
    return useContext(FormsContext);
}

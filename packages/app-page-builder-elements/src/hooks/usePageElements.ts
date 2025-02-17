import { useContext } from "react";
import { PageElementsContext } from "~/contexts/PageElements.js";
import { PageElementsContextValue } from "~/types.js";

export function usePageElements(): PageElementsContextValue {
    return useContext(PageElementsContext);
}

import { useContext } from "react";
import { PageElementsContext } from "~/contexts/PageElements";
import type { PageElementsContextValue } from "~/types";

export function usePageElements(): PageElementsContextValue {
    return useContext(PageElementsContext);
}

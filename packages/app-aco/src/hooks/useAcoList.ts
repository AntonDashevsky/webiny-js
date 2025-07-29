import type { Context } from "react";
import { useContext } from "react";
import type { AcoListContextData } from "~/contexts/acoList";
import { AcoListContext } from "~/contexts/acoList";
import type { GenericSearchData } from "~/types";

export const useAcoList = <T extends GenericSearchData>() => {
    const context = useContext<AcoListContextData<T>>(
        AcoListContext as unknown as Context<AcoListContextData<T>>
    );
    if (!context) {
        throw new Error("useAcoList must be used within a AcoListContext");
    }

    return context;
};

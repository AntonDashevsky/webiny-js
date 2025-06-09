import { useContext, type Context } from "react";
import { AcoListContext, type AcoListContextData } from "~/contexts/acoList.js";
import { type GenericSearchData } from "~/types.js";

export const useAcoList = <T extends GenericSearchData>() => {
    const context = useContext<AcoListContextData<T>>(
        AcoListContext as unknown as Context<AcoListContextData<T>>
    );
    if (!context) {
        throw new Error("useAcoList must be used within a AcoListContext");
    }

    return context;
};

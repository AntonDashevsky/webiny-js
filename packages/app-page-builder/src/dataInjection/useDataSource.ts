import { useContext } from "react";
import { DataSourceContext } from "./DataSourceProvider.js";

export const useDataSource = () => {
    const context = useContext(DataSourceContext);

    if (!context) {
        console.info(
            `Missing DataSourceProvider in the component hierarchy! [TODO: Fix the "saveElement" action dialog!]`
        );
    }

    return context;
};

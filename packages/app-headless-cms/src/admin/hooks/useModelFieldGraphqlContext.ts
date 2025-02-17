import { useModel, useModelField } from "~/admin/hooks/index.js";

export const useModelFieldGraphqlContext = () => {
    const { model } = useModel();
    const { field } = useModelField();

    return {
        cms: {
            model,
            field
        }
    };
};

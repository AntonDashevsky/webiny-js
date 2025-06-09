import get from "lodash/get.js";
import set from "lodash/set.js";
import { type FbFormRenderComponentProps } from "~/types.js";
import {
    SAVE_FORM_VIEW,
    type SaveFormViewMutationResponse,
    type SaveFormViewMutationVariables
} from "./graphql.js";

const saveFormView = ({ data, client }: Required<FbFormRenderComponentProps>) => {
    // SSR?
    if (!window || !data) {
        return;
    }

    if (get(window, "localStorage.form_view_" + data.id)) {
        return;
    }

    set(window, "localStorage.form_view_" + data.id, 1);
    client.mutate<SaveFormViewMutationResponse, SaveFormViewMutationVariables>({
        mutation: SAVE_FORM_VIEW,
        variables: {
            revision: data.id
        }
    });
};

export default (props: Required<FbFormRenderComponentProps>): void => {
    const { data, preview } = props;
    if (!data || preview) {
        return;
    }

    saveFormView(props);
};

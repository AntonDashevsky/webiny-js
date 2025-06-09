import React from "react";
import FormLoad from "./FormLoad.js";
import FormRender from "./FormRender.js";
import { type FormComponentPropsType } from "~/types.js";

const Form = (props: FormComponentPropsType) => {
    if (props.data) {
        return <FormRender {...props} />;
    }

    if (props.parentId || props.revisionId) {
        return <FormLoad {...props} />;
    }

    return null;
};

export default Form;

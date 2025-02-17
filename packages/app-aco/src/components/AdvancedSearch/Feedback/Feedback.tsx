import React from "react";

import { Snackbar } from "@webiny/ui/Snackbar/index.js";

export interface FeedbackProps {
    isOpen: boolean;
    message: string;
}

export const Feedback = (props: FeedbackProps) => {
    return <Snackbar open={props.isOpen} message={props.message} />;
};

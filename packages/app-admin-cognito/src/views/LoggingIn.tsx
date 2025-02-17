import React from "react";
import { CircularProgress } from "@webiny/ui/Progress/index.js";

export const LoggingIn = () => {
    return <CircularProgress label={"Loading identity..."} />;
};

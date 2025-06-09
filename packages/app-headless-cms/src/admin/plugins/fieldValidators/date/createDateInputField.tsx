import React from "react";
import { DateTimeWithoutTimezone } from "../../fieldRenderers/dateTime/DateTimeWithoutTimezone.js";
import { DateTimeWithTimezone } from "../../fieldRenderers/dateTime/DateTimeWithTimezone.js";
import { Time } from "../../fieldRenderers/dateTime/Time.js";
import { type CmsModelField } from "~/types.js";
import { DateOnly } from "~/admin/plugins/fieldRenderers/dateTime/DateOnly.js";
import { type BindComponentRenderProp } from "@webiny/form";

export const createInputField = (field: CmsModelField, bind: BindComponentRenderProp) => {
    const type = field.settings ? field.settings.type : null;
    if (type === "dateTimeWithoutTimezone") {
        return <DateTimeWithoutTimezone field={field} bind={bind} />;
    } else if (type === "dateTimeWithTimezone") {
        return <DateTimeWithTimezone field={field} bind={bind} />;
    } else if (type === "time") {
        return <Time field={field} bind={bind} />;
    }
    return <DateOnly bind={bind} field={field} />;
};

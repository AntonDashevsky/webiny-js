import React from "react";
import { Input } from "@webiny/ui/Input/index.js";
import { Select } from "@webiny/ui/Select/index.js";
import { Grid, Cell } from "@webiny/ui/Grid/index.js";
import { validation } from "@webiny/validation";
import { BindComponent } from "@webiny/form/types.js";
import { UTC_TIMEZONES } from "@webiny/utils";

export const DateTime = ({ fieldFormat, Bind }: { fieldFormat: string; Bind: BindComponent }) => {
    if (fieldFormat === "time") {
        return (
            <Grid>
                <Cell span={12}>
                    <Bind name={"settings.value"} validators={validation.create("required")}>
                        <Input label={"Time"} type="time" />
                    </Bind>
                </Cell>
            </Grid>
        );
    }

    if (fieldFormat === "dateTimeWithTimezone") {
        return (
            <Grid>
                <Cell span={8}>
                    <Bind name={"settings.value"} validators={validation.create("required")}>
                        <Input label={"Date/Time"} type="datetime-local" />
                    </Bind>
                </Cell>
                <Cell span={4}>
                    <Bind name={"settings.timeZone"} validators={validation.create("required")}>
                        <Select label={"Timezone"}>
                            {UTC_TIMEZONES.map(
                                ({ value, label }: { value: string; label: string }) => (
                                    <option value={value} key={label}>
                                        {label}
                                    </option>
                                )
                            )}
                        </Select>
                    </Bind>
                </Cell>
            </Grid>
        );
    }

    if (fieldFormat === "dateTimeWithoutTimezone") {
        return (
            <Grid>
                <Cell span={12}>
                    <Bind name={"settings.value"} validators={validation.create("required")}>
                        <Input label={"Date/Time"} type="datetime-local" />
                    </Bind>
                </Cell>
            </Grid>
        );
    }

    return (
        <Grid>
            <Cell span={12}>
                <Bind name={"settings.value"} validators={validation.create("required")}>
                    <Input label={"Date"} type="date" />
                </Bind>
            </Cell>
        </Grid>
    );
};

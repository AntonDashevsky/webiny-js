import React from "react";
import { Bind } from "@webiny/form";
import { AutoComplete } from "@webiny/ui/AutoComplete/index.js";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { Select } from "@webiny/ui/Select/index.js";

import { InputField } from "./InputField.js";
import { RemoveFilter } from "./controls/index.js";

import { FieldDTOWithElement, FilterGroupFilterDTO } from "../../../domain/index.js";

import { CellInner, FilterContainer } from "../Querybuilder.styled.js";

interface FilterProps {
    name: string;
    filter: FilterGroupFilterDTO & { canDelete: boolean };
    fields: FieldDTOWithElement[];
    onDelete: () => void;
    onFieldSelectChange: (data: string) => void;
}

export const Filter = ({ name, onDelete, onFieldSelectChange, fields, filter }: FilterProps) => {
    return (
        <FilterContainer>
            <Grid>
                <Cell span={4}>
                    <CellInner align={"left"}>
                        <Bind name={`${name}.field`}>
                            {({ value, validation }) => {
                                const options = fields.map(field => ({
                                    id: field.value,
                                    name: field.label
                                }));

                                return (
                                    <AutoComplete
                                        label={"Field"}
                                        options={options}
                                        value={options.find(option => option.id === value)}
                                        onChange={selected => {
                                            /**
                                             * Update the selected value only if it's different from the current value.
                                             * When the value is populated from data, onChange might trigger re-rendering of the form and clear related fields.
                                             */
                                            if (selected !== value) {
                                                onFieldSelectChange(selected);
                                            }
                                        }}
                                        validation={validation}
                                    />
                                );
                            }}
                        </Bind>
                    </CellInner>
                </Cell>
                <Cell span={3}>
                    <CellInner align={"left"}>
                        {filter.field && (
                            <Bind name={`${name}.condition`}>
                                {({ value, onChange, validation }) => (
                                    <Select
                                        label={"Condition"}
                                        options={
                                            fields.find(field => field.value === filter.field)
                                                ?.conditions || []
                                        }
                                        value={value}
                                        onChange={onChange}
                                        validation={validation}
                                    />
                                )}
                            </Bind>
                        )}
                    </CellInner>
                </Cell>
                <Cell span={4} align={"middle"}>
                    <CellInner align={"left"}>
                        {filter.condition && (
                            <InputField
                                name={`${name}.value`}
                                field={fields.find(field => field.value === filter.field)}
                            />
                        )}
                    </CellInner>
                </Cell>
                <Cell span={1} align={"middle"}>
                    <CellInner align={"center"}>
                        <RemoveFilter onClick={onDelete} disabled={!filter.canDelete} />
                    </CellInner>
                </Cell>
            </Grid>
        </FilterContainer>
    );
};

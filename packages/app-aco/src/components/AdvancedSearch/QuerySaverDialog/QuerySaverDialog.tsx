import React, { useEffect, useMemo } from "react";

import { Form } from "@webiny/form";
import { ButtonDefault, ButtonPrimary } from "@webiny/ui/Button/index.js";
import { DialogActions, DialogContent, DialogTitle } from "@webiny/ui/Dialog/index.js";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { Input } from "@webiny/ui/Input/index.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";

import { QuerySaverDialogFormData, QuerySaverDialogPresenter } from "./QuerySaverDialogPresenter.js";

import { FilterDTO } from "../domain/index.js";

import { DialogContainer } from "./QuerySaverDialog.styled.js";

interface QuerySaverDialogProps {
    onClose: () => void;
    onSave: (data: FilterDTO) => void;
    filter: FilterDTO;
    vm: {
        isOpen: boolean;
        isLoading: boolean;
        loadingLabel: string;
    };
}

export const QuerySaverDialog = ({ filter, ...props }: QuerySaverDialogProps) => {
    const presenter = useMemo<QuerySaverDialogPresenter>(() => {
        return new QuerySaverDialogPresenter();
    }, []);

    useEffect(() => {
        presenter.load(filter);
    }, [filter]);

    const onChange = (data: QuerySaverDialogFormData) => {
        presenter.setFilter(data);
    };

    const onSubmit = () => {
        presenter.onSave(filter => {
            props.onSave(filter);
        });
    };

    return (
        <DialogContainer open={props.vm.isOpen} onClose={props.onClose}>
            {props.vm.isOpen ? (
                <Form
                    data={presenter.vm.data}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    invalidFields={presenter.vm.invalidFields}
                >
                    {({ Bind, form }) => (
                        <>
                            <DialogTitle>{"Save search filter"}</DialogTitle>
                            {props.vm.isLoading && (
                                <CircularProgress label={props.vm.loadingLabel} />
                            )}
                            <DialogContent>
                                <Grid>
                                    <Cell span={12} align={"middle"}>
                                        <Bind name={"name"}>
                                            <Input type={"text"} label={"Name"} />
                                        </Bind>
                                    </Cell>
                                    <Cell span={12} align={"middle"}>
                                        <Bind name={"description"}>
                                            <Input type={"text"} label={"Description"} rows={6} />
                                        </Bind>
                                    </Cell>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <ButtonDefault onClick={props.onClose}>{"Cancel"}</ButtonDefault>
                                <ButtonPrimary onClick={form.submit}>
                                    {"Save and apply"}
                                </ButtonPrimary>
                            </DialogActions>
                        </>
                    )}
                </Form>
            ) : null}
        </DialogContainer>
    );
};

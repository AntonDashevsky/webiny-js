import React from "react";
import { css } from "emotion";
import { Bind } from "@webiny/form";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange/index.js";
import { validation } from "@webiny/validation";
import { Switch } from "@webiny/ui/Switch/index.js";
import { PbPageElementActionTypePlugin } from "~/types.js";
import Wrapper from "../../components/Wrapper.js";
import InputField from "../../components/InputField.js";

const classes = {
    gridClass: css({
        "&.mdc-layout-grid": {
            padding: 0,
            marginBottom: 24
        }
    }),
    gridCellClass: css({
        justifySelf: "end"
    }),
    bottomMargin: css({
        marginBottom: 8
    })
};

const LinkForm = () => {
    return (
        <>
            <Wrapper label={"URL"} containerClassName={classes.gridClass}>
                <Bind name={"href"} validators={validation.create("url:allowRelative:allowHref")}>
                    <DelayedOnChange>
                        {props => (
                            <InputField
                                {...props}
                                value={props.value || ""}
                                onChange={props.onChange}
                                placeholder={"https://webiny.com/blog"}
                            />
                        )}
                    </DelayedOnChange>
                </Bind>
            </Wrapper>
            <Wrapper
                label={"New tab"}
                containerClassName={classes.gridClass}
                rightCellClassName={classes.gridCellClass}
            >
                <Bind name={"newTab"}>
                    <Switch />
                </Bind>
            </Wrapper>
        </>
    );
};

export const linkActionType: PbPageElementActionTypePlugin = {
    type: "pb-page-element-action-type",
    actionType: {
        name: "link",
        label: "Link",
        element: <LinkForm />
    }
};

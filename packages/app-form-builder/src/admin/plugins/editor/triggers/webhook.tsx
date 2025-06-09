import React from "react";
import { Grid, Cell } from "@webiny/ui/Grid/index.js";
import { ButtonPrimary } from "@webiny/ui/Button/index.js";
import { type FbEditorTrigger } from "~/types.js";
import { ReactComponent as LinkIcon } from "./icons/round-link-24px.svg";
import WebhooksRequestsDynamicFieldset from "./components/WebhooksRequestsDynamicFieldset.js";

const plugin: FbEditorTrigger = {
    type: "form-editor-trigger",
    name: "form-editor-trigger-webhook",
    trigger: {
        id: "webhook",
        title: "Webhook",
        description: "Do a POST HTTP request to a specific URL.",
        icon: <LinkIcon />,
        renderSettings({ Bind, submit }) {
            return (
                <Grid>
                    <Cell span={12}>
                        <Bind name={"urls"}>
                            <WebhooksRequestsDynamicFieldset
                                Bind={Bind}
                                title={"Webhook URLs"}
                                inputLabel={"URL"}
                                addButtonLabel={"+ Add URL"}
                            />
                        </Bind>
                    </Cell>
                    <Cell>
                        <ButtonPrimary
                            onClick={ev => {
                                submit(ev);
                            }}
                        >
                            Save
                        </ButtonPrimary>
                    </Cell>
                </Grid>
            );
        }
    }
};
export default plugin;

import React from "react";
import styled from "@emotion/styled";
import kebabCase from "lodash/kebabCase.js";
import { Typography } from "@webiny/ui/Typography/index.js";
import { validation } from "@webiny/validation";
import { createEmbedPlugin, createEmbedSettingsPlugin } from "../../utils/oembed/index.js";
import VimeoEmbed from "./VimeoEmbed.js";
import { ReactComponent as LogoIcon } from "./vimeo-v-brands.svg";
import Accordion from "../../../elementSettings/components/Accordion.js";
import InputField from "../../../elementSettings/components/InputField.js";
import {
    ButtonContainer,
    SimpleButton
} from "../../../elementSettings/components/StyledComponents.js";
import { PbEditorElementPluginArgs } from "~/types.js";
import { EmbedPluginConfigRenderCallable } from "~/editor/plugins/elements/utils/oembed/createEmbedPlugin.js";

import { PeVimeo } from "./PeVimeo.js";

const PreviewBox = styled("div")({
    textAlign: "center",
    height: 50,
    svg: {
        height: 50,
        width: 50
    }
});

const render: EmbedPluginConfigRenderCallable = props => (
    // @ts-expect-error Sync `elements` property type.
    <PeVimeo {...props} />
);

export default (args: PbEditorElementPluginArgs = {}) => {
    const elementType = kebabCase(args.elementType || "vimeo");
    const defaultToolbar = {
        title: "Vimeo",
        group: "pb-editor-element-group-embeds",
        preview() {
            return (
                <PreviewBox>
                    <LogoIcon />
                </PreviewBox>
            );
        }
    };

    return [
        createEmbedPlugin({
            type: elementType,
            /**
             * TODO @ts-refactor @ashutosh
             */
            // @ts-expect-error
            toolbar:
                typeof args.toolbar === "function" ? args.toolbar(defaultToolbar) : defaultToolbar,
            create: args.create,
            /**
             * TODO Figure out types.
             */
            // @ts-expect-error
            settings: args.settings,
            oembed: {
                renderEmbed(props) {
                    return <VimeoEmbed {...props} />;
                }
            },
            renderElementPreview() {
                return <div>Vimeo video</div>;
            },
            render
        }),
        createEmbedSettingsPlugin({
            type: elementType,
            render({ Bind, submit }) {
                return (
                    <Accordion title={"Vimeo"} defaultValue={true}>
                        <>
                            <Bind
                                name={"source.url"}
                                validators={validation.create("required,url")}
                            >
                                <InputField
                                    placeholder={"https://vimeo.com/158050352"}
                                    description={"Enter a video URL"}
                                />
                            </Bind>
                            <ButtonContainer>
                                <SimpleButton onClick={submit}>
                                    <Typography use={"caption"}>Save</Typography>
                                </SimpleButton>
                            </ButtonContainer>
                        </>
                    </Accordion>
                );
            }
        })
    ];
};

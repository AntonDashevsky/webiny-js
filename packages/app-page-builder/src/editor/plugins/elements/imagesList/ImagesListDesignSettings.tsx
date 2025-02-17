import React from "react";
import Accordion from "../../elementSettings/components/Accordion.js";
import Wrapper from "../../elementSettings/components/Wrapper.js";
import SelectField from "../../elementSettings/components/SelectField.js";
import { Grid, Cell } from "@webiny/ui/Grid/index.js";
import { plugins } from "@webiny/plugins";
import { PbPageElementImagesListComponentPlugin } from "~/types.js";
import {
    ButtonContainer,
    classes,
    SimpleButton
} from "../../elementSettings/components/StyledComponents.js";
import { BindComponent } from "@webiny/form";

interface ImagesListDesignSettingsProps {
    Bind: BindComponent;
    submit: (event: React.MouseEvent) => void;
}
const ImagesListDesignSettings = ({ Bind, submit }: ImagesListDesignSettingsProps) => {
    const components = plugins.byType<PbPageElementImagesListComponentPlugin>(
        "pb-page-element-images-list-component"
    );

    return (
        <Accordion title={"Design"} defaultValue={true}>
            <React.Fragment>
                <Wrapper label={"Component"} containerClassName={classes.simpleGrid}>
                    <Bind
                        name={"component"}
                        defaultValue={components[0] ? components[0].componentName : null}
                    >
                        <SelectField
                            label={"Design"}
                            description={"Select a component to render the list"}
                        >
                            {components.map(cmp => (
                                <option key={cmp.name} value={cmp.componentName}>
                                    {cmp.title}
                                </option>
                            ))}
                        </SelectField>
                    </Bind>
                </Wrapper>
                <Grid className={classes.simpleGrid}>
                    <Cell span={12}>
                        <ButtonContainer>
                            <SimpleButton onClick={submit}>Save</SimpleButton>
                        </ButtonContainer>
                    </Cell>
                </Grid>
            </React.Fragment>
        </Accordion>
    );
};

export default ImagesListDesignSettings;

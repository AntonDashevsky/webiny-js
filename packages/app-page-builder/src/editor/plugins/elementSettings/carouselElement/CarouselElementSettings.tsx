import React from "react";
import get from "lodash/get.js";
import useUpdateHandlers from "~/editor/plugins/elementSettings/useUpdateHandlers.js";
import Wrapper from "~/editor/plugins/elementSettings/components/Wrapper.js";
import Accordion from "~/editor/plugins/elementSettings/components/Accordion.js";
import {
    ContentWrapper,
    classes
} from "~/editor/plugins/elementSettings/components/StyledComponents.js";
import InputField from "~/editor/plugins/elementSettings/components/InputField.js";
import { useActiveElement } from "~/editor/hooks/useActiveElement.js";
import { type PbEditorElement, type PbEditorPageElementSettingsRenderComponentProps } from "~/types.js";

const DATA_NAMESPACE = "data.settings.carouselElement";

const CarouselElementSettings = ({
    defaultAccordionValue
}: PbEditorPageElementSettingsRenderComponentProps) => {
    const [element] = useActiveElement<PbEditorElement>();
    const { getUpdateValue } = useUpdateHandlers({
        element,
        dataNamespace: DATA_NAMESPACE
    });

    return (
        <Accordion title={"Carousel Element"} defaultValue={defaultAccordionValue}>
            <ContentWrapper direction={"column"}>
                <Wrapper
                    label={"Carousel Element Label"}
                    leftCellSpan={5}
                    rightCellSpan={7}
                    containerClassName={classes.simpleGrid}
                >
                    <InputField
                        value={get(element, DATA_NAMESPACE + ".label", "")}
                        onChange={getUpdateValue("label")}
                    />
                </Wrapper>
            </ContentWrapper>
        </Accordion>
    );
};

export default React.memo(CarouselElementSettings);

import React, { useCallback } from "react";
import styled from "@emotion/styled";
import {
    type CmsReferenceContentEntry,
    type CmsReferenceValue
} from "~/admin/plugins/fieldRenderers/ref/components/types.js";
import { Image } from "./entry/Image.js";
import { ModelName } from "./entry/ModelName.js";
import { Title } from "./entry/Title.js";
import { Description } from "./entry/Description.js";
import { Status } from "./entry/Status.js";
import { CreatedBy } from "./entry/CreatedBy.js";
import { ModifiedBy } from "./entry/ModifiedBy.js";
import { View } from "./entry/View.js";
import { Select } from "./entry/Select.js";
import { Remove } from "./entry/Remove.js";
import { MoveUp } from "./entry/MoveUp.js";
import { MoveDown } from "./entry/MoveDown.js";
import { type CmsModel } from "~/types.js";

const Container = styled("div")({
    width: "100%",
    display: "flex",
    backgroundColor: "#FFF",
    flexDirection: "column",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
    marginBottom: "10px",
    boxSizing: "border-box"
});

const ContentContainer = styled("div")({
    width: "100%",
    display: "grid",
    gridTemplateColumns: "166px auto",
    borderBottom: "1px solid var(--mdc-theme-background)"
});

const Content = styled("div")({
    paddingLeft: "16px",
    paddingTop: "18px",
    paddingBottom: "10px"
});

const FooterContainer = styled("div")({
    display: "flex",
    flexDirection: "row",
    padding: "10px",
    flexWrap: "wrap-reverse",
    justifyContent: "center",
    marginBottom: "-10px"
});

const LeftContainer = styled("div")({
    display: "flex",
    flexWrap: "nowrap",
    flexBasis: "50%",
    alignItems: "center",
    flexShrink: 1,
    flexGrow: 1,
    justifyContent: "space-around",
    borderBottom: "1px solid var(--mdc-theme-on-background)",
    paddingBottom: 10,
    marginTop: -10,
    paddingTop: 15
});

const RightContainer = styled("div")({
    display: "flex",
    flexWrap: "nowrap",
    flexBasis: "50%",
    flexShrink: 1,
    flexGrow: 1,
    justifyContent: "space-around",
    borderBottom: "1px solid var(--mdc-theme-on-background)",
    paddingBottom: 10,
    ">div": {
        minWidth: "100px"
    }
});

interface EntryProps {
    model: CmsModel;
    entry: CmsReferenceContentEntry;
    onChange: (value: CmsReferenceValue) => void;
    index?: never;
    selected: boolean;
    onMoveUp?: never;
    onMoveDown?: never;
    onRemove?: never;
    placement?: string;
}

interface EntryPropsWithRemove {
    onRemove: (entryId: string) => void;
    model: CmsModel;
    entry: CmsReferenceContentEntry;
    index: number;
    onMoveUp?: (index: number, toTop: boolean) => void;
    onMoveDown?: (index: number, toBottom: boolean) => void;
    onChange?: never;
    selected?: never;
    placement?: string;
}

export const Entry = ({
    model,
    entry,
    onChange,
    onRemove,
    selected,
    index,
    onMoveUp: onMoveUpClick,
    onMoveDown: onMoveDownClick,
    placement
}: EntryPropsWithRemove | EntryProps) => {
    const onMoveUp = useCallback(
        (ev: React.MouseEvent) => {
            if (!onMoveUpClick) {
                return;
            }
            onMoveUpClick(index, ev.shiftKey);
        },
        [onMoveUpClick, index]
    );
    const onMoveDown = useCallback(
        (ev: React.MouseEvent) => {
            if (!onMoveDownClick) {
                return;
            }
            onMoveDownClick(index, ev.shiftKey);
        },
        [onMoveDownClick, index]
    );

    const icon = model.icon;

    return (
        <Container>
            <ContentContainer>
                <Image title={entry.title} src={entry.image} icon={icon} />
                <Content>
                    <ModelName name={entry.model.name} />
                    <Title title={entry.title} />
                    <Description description={entry.description} />
                </Content>
            </ContentContainer>
            <FooterContainer>
                <LeftContainer>
                    <Status status={entry.status} />
                    <CreatedBy createdBy={entry.createdBy} createdOn={entry.createdOn} />
                    <ModifiedBy modifiedBy={entry.modifiedBy} savedOn={entry.savedOn} />
                </LeftContainer>
                <RightContainer>
                    {placement == "multiRef" && (
                        <>
                            <MoveUp
                                className={onMoveUpClick ? "active" : "disabled"}
                                onClick={onMoveUp}
                            />
                            <MoveDown
                                className={onMoveDownClick ? "active" : "disabled"}
                                onClick={onMoveDown}
                            />
                        </>
                    )}
                    <View entry={entry} />
                    {onChange && <Select entry={entry} onChange={onChange} selected={selected} />}
                    {onRemove && <Remove entry={entry} onRemove={onRemove} />}
                </RightContainer>
            </FooterContainer>
        </Container>
    );
};

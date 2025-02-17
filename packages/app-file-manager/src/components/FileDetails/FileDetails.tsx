import React, { useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import noop from "lodash/noop.js";
// @ts-expect-error This package has no types.
import { useHotkeys } from "react-hotkeyz";
import styled from "@emotion/styled";
import { FileItem } from "@webiny/app-admin/types.js";
import { Form, FormOnSubmit } from "@webiny/form";
import { prepareFormData } from "@webiny/app-headless-cms-common";
import { DrawerRight, DrawerContent } from "@webiny/ui/Drawer/index.js";
import { CircularProgress } from "@webiny/ui/Progress/index.js";
import { Cell, Grid } from "@webiny/ui/Grid/index.js";
import { Tab, Tabs } from "@webiny/ui/Tabs/index.js";
import { FileDetailsProvider } from "~/components/FileDetails/FileDetailsProvider.js";
import { Preview } from "./components/Preview.js";
import { PreviewMeta } from "./components/PreviewMeta.js";
import { Actions } from "./components/Actions.js";
import { Header } from "./components/Header.js";
import { Elevation } from "@webiny/ui/Elevation/index.js";
import { Content } from "./components/Content.js";
import { SimpleForm } from "@webiny/app-admin/components/SimpleForm/index.js";
import { Footer } from "./components/Footer.js";
import { Extensions } from "./components/Extensions.js";
import { useFileModel } from "~/hooks/useFileModel.js";
import { useFileManagerViewConfig } from "~/index.js";
import { FileProvider } from "~/contexts/FileProvider.js";

type FileDetailsDrawerProps = React.ComponentProps<typeof DrawerRight> & { width: string };

const FileDetailsDrawer = styled(DrawerRight)<FileDetailsDrawerProps>`
    z-index: 70;
    &.mdc-drawer {
        width: ${props => props.width};
    }
    .mdc-drawer__content {
        overflow-y: hidden;
    }
    & + .mdc-drawer-scrim {
        z-index: 65;
    }
`;

const FormContainer = styled(SimpleForm)`
    margin: 0;
`;

interface FileDetailsInnerProps {
    file: FileItem;
    onClose: () => void;
    onSubmit: (fileData: FileItem) => void;
}

const FileDetailsInner = ({ file, ...props }: FileDetailsInnerProps) => {
    const fileModel = useFileModel();
    const { fileDetails } = useFileManagerViewConfig();

    const [, leftPanel = "1", rightPanel = "1"] = fileDetails.width.split(",");

    const extensionFields = useMemo(() => {
        const fields = fileModel.fields.find(field => field.fieldId === "extensions");
        if (!fields?.settings?.fields) {
            return [];
        }
        return fields?.settings?.fields || [];
    }, [fileModel]);

    const onSubmit: FormOnSubmit<FileItem> = async data => {
        const fileData = prepareFormData(data, fileModel.fields);
        props.onSubmit({ ...file, ...fileData });
    };

    const basicFieldsElement = (
        <Grid>
            {fileDetails.fields.map(field => (
                <Cell span={12} key={field.name}>
                    {field.element}
                </Cell>
            ))}
        </Grid>
    );

    const extensionFieldsElement =
        extensionFields.length > 0 ? <Extensions model={fileModel} /> : null;

    return (
        <Form data={file} onSubmit={onSubmit}>
            {() => (
                <FormContainer>
                    <Header />
                    <Content>
                        <Content.Panel flex={parseFloat(leftPanel)}>
                            <Elevation z={2} style={{ margin: 20 }}>
                                <Actions />
                                <Preview />
                                <PreviewMeta />
                            </Elevation>
                        </Content.Panel>
                        <Content.Panel flex={parseFloat(rightPanel)}>
                            {fileDetails.groupFields ? (
                                <Tabs>
                                    <Tab label={"Basic Details"}>{basicFieldsElement}</Tab>
                                    <Tab label={"Advanced Details"}>{extensionFieldsElement}</Tab>
                                </Tabs>
                            ) : (
                                <>
                                    {basicFieldsElement}
                                    {extensionFieldsElement}
                                </>
                            )}
                        </Content.Panel>
                    </Content>
                    <Footer />
                </FormContainer>
            )}
        </Form>
    );
};

function getPortalTarget() {
    let target = window.document.getElementById("file-details-drawer");
    if (!target) {
        target = document.createElement("div");
        target.setAttribute("id", "file-details-drawer");
        document.body && document.body.appendChild(target);
    }
    return target;
}

interface FileDetailsPortalProps {
    children: React.ReactNode;
}

const FileDetailsPortal = ({ children }: FileDetailsPortalProps) => {
    const containerRef = useRef<HTMLElement>(getPortalTarget());

    return ReactDOM.createPortal(children, containerRef.current);
};

export interface FileDetailsProps {
    file?: FileItem;
    open: boolean;
    loading: string | null;
    onClose: () => void;
    onSave: (file: FileItem) => void;
    onSetFile?: (file: FileItem) => void;
}

export const FileDetails = ({
    open,
    onClose,
    onSave,
    loading,
    file,
    onSetFile = noop
}: FileDetailsProps) => {
    useHotkeys({
        zIndex: 55,
        disabled: !open,
        keys: {
            esc: onClose
        }
    });

    const { fileDetails } = useFileManagerViewConfig();

    const drawerWidth = fileDetails.width.split(",")[0];

    return (
        <FileDetailsPortal>
            <FileDetailsDrawer
                width={drawerWidth}
                modal
                open={open}
                onClose={onClose}
                data-testid={"fm.file-details.drawer"}
            >
                <DrawerContent>
                    {loading && <CircularProgress label={loading} />}
                    {file && (
                        <FileProvider file={file}>
                            <FileDetailsProvider hideFileDetails={onClose} onSetFile={onSetFile}>
                                <FileDetailsInner file={file} onClose={onClose} onSubmit={onSave} />
                            </FileDetailsProvider>
                        </FileProvider>
                    )}
                </DrawerContent>
            </FileDetailsDrawer>
        </FileDetailsPortal>
    );
};

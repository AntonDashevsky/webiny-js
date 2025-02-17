import React from "react";
import { DrawerContent, DrawerRight } from "@webiny/ui/Drawer/index.js";
import { PageDetails } from "~/admin/views/Pages/PageDetails.js";

interface PreviewProps {
    open: boolean;
    onClose: () => void;
    canCreate: boolean;
    onCreatePage: () => void;
}

const width = {
    width: "60vw"
};

export const Preview = ({ open, onClose, canCreate, onCreatePage }: PreviewProps) => {
    return (
        <DrawerRight modal={true} open={open} onClose={onClose} style={width}>
            <DrawerContent>
                <PageDetails canCreate={canCreate} onCreatePage={onCreatePage} onDelete={onClose} />
            </DrawerContent>
        </DrawerRight>
    );
};

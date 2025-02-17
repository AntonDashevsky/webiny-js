import React from "react";
import mime from "mime/lite.js";

import SupportedFileTypes, { SupportedFileTypesProps } from "./SupportedFileTypes.js";
import ListStatus, { ListStatusProps } from "./ListStatus.js";

import { BottomInfoBarInner, BottomInfoBarWrapper } from "./styled.js";

mime.define({ "image/x-icon": ["ico"] }, true);
mime.define({ "image/jpg": ["jpg"] }, true);
mime.define({ "image/vnd.microsoft.icon": ["ico"] }, true);

type BottomInfoBarProps = SupportedFileTypesProps & ListStatusProps;

export const BottomInfoBar = (props: BottomInfoBarProps) => {
    return (
        <BottomInfoBarWrapper>
            <BottomInfoBarInner>
                <SupportedFileTypes {...props} />
                <ListStatus {...props} />
            </BottomInfoBarInner>
        </BottomInfoBarWrapper>
    );
};

import React from "react";
import { ReactComponent as PlaceholderIcon } from "@webiny/icons/image.svg";
import type { FileItemFormatted } from "~/FilePicker";
import { Icon } from "~/Icon";
import { cn } from "~/utils";
import type { RichItemPreviewProps } from "~/FilePicker/primitives/components";

import csvThumb from "../assets/csv.svg";
import docThumb from "../assets/doc.svg";
import docxThumb from "../assets/docx.svg";
import fileThumb from "../assets/file.svg";
import pdfThumb from "../assets/pdf.svg";
import pptThumb from "../assets/ppt.svg";
import pptxThumb from "../assets/pptx.svg";
import txtThumb from "../assets/txt.svg";
import xlsThumb from "../assets/xls.svg";
import xlsxThumb from "../assets/xlsx.svg";

type RichItemThumbnailProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> &
    FileItemFormatted & {
        preview?: RichItemPreviewProps["preview"];
        disabled?: boolean;
    };

type ThumbnailProps = Pick<FileItemFormatted, "url" | "name">;

const Thumbnail = ({ url, name }: ThumbnailProps) => {
    return (
        <div className={"wby-size-full wby-bg-neutral-muted"}>
            <img src={url} alt={name} className="wby-size-full wby-object-cover" />
        </div>
    );
};

type FileTypeProps = Pick<FileItemFormatted, "mimeType" | "name">;

const FileType = ({ mimeType = "", name }: FileTypeProps) => {
    const getMimeTypeSrc = (mimeType: string) => {
        switch (mimeType) {
            case "text/csv": // .csv
                return csvThumb;
            case "application/msword": // .doc
                return docThumb;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": // .docx
                return docxThumb;
            case "application/pdf": // .pdf
                return pdfThumb;
            case "application/vnd.ms-powerpoint": // .ppt
                return pptThumb;
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation": // .pptx
                return pptxThumb;
            case "text/plain": // .txt
                return txtThumb;
            case "application/vnd.ms-excel": // .xls
                return xlsThumb;
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": // .xlsx
                return xlsxThumb;
            default:
                return fileThumb;
        }
    };

    return (
        <img src={getMimeTypeSrc(mimeType)} alt={name} className="wby-size-full wby-p-sm-extra" />
    );
};

type PlaceholderProps = Pick<FileItemFormatted, "name">;

const Placeholder = ({ name }: PlaceholderProps) => {
    return (
        <div
            className={
                "wby-size-full wby-flex wby-justify-center wby-items-center wby-bg-transparent"
            }
        >
            <Icon icon={<PlaceholderIcon />} label={name} size={"lg"} color={"neutral-light"} />
        </div>
    );
};

const RichItemThumbnail = ({
    url,
    name,
    className,
    mimeType,
    preview,
    disabled
}: RichItemThumbnailProps) => {
    const isImage = mimeType?.startsWith("image/");

    return (
        <div
            className={cn(
                "wby-size-[56px] wby-m-xs wby-rounded-sm wby-overflow-hidden wby-relative",
                disabled && "[&_img]:wby-filter [&_img]:wby-grayscale [&_img]:wby-opacity-50",
                className
            )}
        >
            {preview === "thumbnail" || isImage ? (
                <Thumbnail url={url} name={name} />
            ) : preview === "placeholder" ? (
                <Placeholder name={name} />
            ) : (
                <FileType mimeType={mimeType} name={name} />
            )}
        </div>
    );
};

export { RichItemThumbnail, type RichItemThumbnailProps };

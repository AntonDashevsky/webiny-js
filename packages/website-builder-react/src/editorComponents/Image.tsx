import React from "react";
import type { CssProperties } from "@webiny/app-website-builder/sdk";
import type { ComponentPropsWithChildren } from "~/types";

const SUPPORTED_IMAGE_RESIZE_WIDTHS = [100, 300, 500, 750, 1000, 1500, 2500];

type ImageProps = ComponentPropsWithChildren<{
    htmlTag: "auto-detect" | "img" | "object";
    title: string;
    altText: string;
    image: {
        id: string;
        name: string;
        size: number;
        mimeType: string;
        src: string;
    };
}>;

export const ImageComponent = ({ inputs, styles }: ImageProps) => {
    if (!inputs.image?.src) {
        return <ImagePlaceholder style={styles} />;
    }

    const { title = "", altText, htmlTag, image } = inputs;

    let imageTag = htmlTag;
    if (htmlTag === "auto-detect" && image.src.endsWith(".svg")) {
        imageTag = "img";
    }

    if (imageTag === "object") {
        return <object style={styles} title={title} data={image.src} />;
    }

    // If a fixed image width in pixels was set, let's filter out unneeded
    // image resize widths. For example, if 155px was set as the fixed image
    // width, then we want the `srcset` attribute to only contain 100w and 300w.
    let srcSetWidths: number[] = [];
    const width = styles.width?.toString();

    if (width && width.endsWith("px")) {
        const imageWidthInt = parseInt(width);
        for (let i = 0; i < SUPPORTED_IMAGE_RESIZE_WIDTHS.length; i++) {
            const supportedResizeWidth = SUPPORTED_IMAGE_RESIZE_WIDTHS[i];
            if (imageWidthInt > supportedResizeWidth) {
                srcSetWidths.push(supportedResizeWidth);
            } else {
                srcSetWidths.push(supportedResizeWidth);
                break;
            }
        }
    } else {
        // If a fixed image width was not provided, we
        // rely on all the supported image resize widths.
        srcSetWidths = SUPPORTED_IMAGE_RESIZE_WIDTHS;
    }

    const srcSet = srcSetWidths
        .map(item => {
            return `${image.src}?width=${item} ${item}w`;
        })
        .join(", ");

    return (
        <img
            alt={altText}
            title={title}
            src={image.src}
            srcSet={srcSet}
            style={{ maxWidth: "100%", ...styles }}
        />
    );
};

const ImagePlaceholder = ({ style }: { style: CssProperties }) => {
    return (
        <div
            style={{
                display: "flex",
                height: "200px",
                backgroundColor: "#f4f4f4",
                justifyContent: "center",
                alignItems: "center",
                fill: "#ffffff",
                ...style
            }}
        >
            <svg
                style={{
                    width: "70px",
                    height: "70px",
                    filter: "drop-shadow(rgba(0, 0, 0, 0.16) 0px 1px 0px)"
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
            >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
            </svg>
        </div>
    );
};

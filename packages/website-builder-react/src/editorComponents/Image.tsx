import React from "react";
import type { CssProperties } from "@webiny/app-website-builder/sdk";
import type { ComponentPropsWithChildren } from "~/types";

type ImageProps = ComponentPropsWithChildren<{
    image: {
        id: string;
        name: string;
        size: number;
        mimeType: string;
        url: string;
    };
}>;

export const ImageComponent = ({ inputs, styles }: ImageProps) => {
    if (!inputs.image?.url) {
        return <ImagePlaceholder style={styles} />;
    }
    return <img src={inputs.image?.url ?? styles.backgroundImage} style={styles} />;
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

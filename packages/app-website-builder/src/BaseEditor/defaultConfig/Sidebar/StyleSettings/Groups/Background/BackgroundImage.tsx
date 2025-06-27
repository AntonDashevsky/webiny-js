import React, { useEffect, useState, useMemo } from "react";
import { FileManager } from "@webiny/app-admin";
import { FilePicker } from "@webiny/admin-ui";
import { useStyles } from "~/BaseEditor/defaultConfig/Sidebar/StyleSettings/useStyles";
import { BackgroundImageParser } from "./BackgroundImageParser";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { InheritanceLabel } from "../../../InheritanceLabel";

const DEFAULT_POSITION = "center";
const DEFAULT_SCALING = {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
};

export const parseValue = (value: string) => {
    if (!value) {
        return undefined;
    }

    return;
};

export const BackgroundImage = () => {
    const { isBaseBreakpoint } = useBreakpoint();
    const { styles, onChange, inheritanceMap } = useStyles();
    const [localValue, setLocalValue] = useState<string | null>(styles.backgroundImage);
    const url = useMemo(() => {
        const parser = new BackgroundImageParser(styles.backgroundImage);
        const rules = parser.getRules();
        const urlRule = rules.find(r => r.type === "url");
        if (urlRule && urlRule.type === "url") {
            return urlRule.parsed.url;
        }
        return null;
    }, [styles.backgroundImage]);

    useEffect(() => {
        if (styles.backgroundImage !== localValue) {
            setLocalValue(styles.backgroundImage);
        }
    }, [styles.backgroundImage]);

    const onFileChange = (file: any) => {
        const metaItems = file.meta || [];
        const getName = () => {
            const nameItem = metaItems.find((item: { key: string }) => item.key === "name");
            return nameItem ? nameItem.value : "";
        };
        const getSize = () => {
            const sizeItem = metaItems.find((item: { key: string }) => item.key === "size");
            return sizeItem ? sizeItem.value : 0;
        };
        const getType = () => {
            const typeItem = metaItems.find((item: { key: string }) => item.key === "type");
            return typeItem ? typeItem.value : "";
        };

        // TODO: where should I store this?
        console.log({
            id: file.id,
            name: getName(),
            size: getSize(),
            mimeType: getType(),
            url: file.src || ""
        });

        onChange(styles => {
            styles.backgroundPosition = DEFAULT_POSITION;
            styles.backgroundSize = DEFAULT_SCALING.backgroundSize;
            styles.backgroundRepeat = DEFAULT_SCALING.backgroundRepeat;
            styles.backgroundImage = `url("${file.src}")`;
        });
    };

    const onRemove = () => {
        onChange(styles => {
            // On base breakpoint, we unset the image and all styles related to it.
            if (isBaseBreakpoint) {
                delete styles.backgroundImage;
                delete styles.backgroundPosition;
                delete styles.backgroundSize;
                delete styles.backgroundRepeat;
            } else {
                styles.backgroundImage = "none";
            }
        });
    };

    const onReset = () => {
        onChange(styles => {
            delete styles.backgroundImage;
        });
    };

    const inheritance = inheritanceMap?.backgroundImage ?? {};

    return (
        <FileManager
            images={true}
            onChange={onFileChange}
            render={({ showFileManager }) => (
                <FilePicker
                    label={
                        <InheritanceLabel
                            onReset={onReset}
                            isOverridden={inheritance?.overridden ?? false}
                            inheritedFrom={inheritance?.inheritedFrom}
                            text={"Image"}
                        />
                    }
                    description="Select a background image"
                    type="compact"
                    value={url ? { name: url, url } : undefined}
                    onSelectItem={() => showFileManager()}
                    onRemoveItem={onRemove}
                    onEditItem={() => showFileManager()}
                />
            )}
        />
    );
};

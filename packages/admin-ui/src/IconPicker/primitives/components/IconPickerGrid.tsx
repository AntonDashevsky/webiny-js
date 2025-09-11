import React, { useCallback } from "react";
import type { GridCellProps } from "react-virtualized";
import { Grid } from "react-virtualized";
import { Text } from "~/Text/index.js";
import { cn } from "~/utils.js";
import type { IconPickerFontAwesome } from "../../domains/index.js";
import { IconPickerIconFormatter } from "../../domains/index.js";
import { IconPickerIcon } from "./IconPickerIcon.js";

const COLUMN_COUNT = 5;
const GRID_WIDTH = 424;
const GRID_HEIGHT = 270;
const COLUMN_WIDTH = 80;
const ROW_HEIGHT = 80;

interface IconPickerGridProps {
    icons: IconPickerFontAwesome[];
    iconsLength: number;
    onIconSelect: (value: string) => void;
}

const IconPickerGrid = (props: IconPickerGridProps) => {
    const renderCell = useCallback(() => {
        return function renderCell({
            columnIndex,
            key,
            rowIndex,
            style
        }: GridCellProps): React.ReactNode {
            const item = props.icons[rowIndex * COLUMN_COUNT + columnIndex];
            if (!item) {
                return null;
            }

            return (
                <div
                    key={key}
                    style={style}
                    className={cn([
                        "wby-flex wby-flex-col wby-justify-center wby-items-center wby-gap-sm",
                        "wby-text-neutral-strong",
                        "hover:wby-bg-neutral-dimmed hover:wby-text-neutral-strong",
                        "wby-px-xs-plus wby-box-border wby-rounded-xs wby-cursor-pointer wby-overflow-hidden",
                        "wby-transition-colors wby-duration-400 wby-ease-out"
                    ])}
                    onClick={() => {
                        if (props.onIconSelect) {
                            props.onIconSelect(IconPickerIconFormatter.formatStringValue(item));
                        }
                    }}
                >
                    <IconPickerIcon
                        name={item.name}
                        prefix={item.prefix}
                        className={"wby-size-lg"}
                    />
                    <Text
                        as={"div"}
                        size={"sm"}
                        className={"wby-w-full wby-truncate wby-text-center wby-text-neutral-muted"}
                    >
                        {item.name}
                    </Text>
                </div>
            );
        };
    }, [props.icons]);

    return (
        <div>
            {props.iconsLength === 0 ? (
                <div className={`wby-px-sm-extra wby-py-md wby-text-neutral-strong`}>
                    <Text>{"No results found."}</Text>
                </div>
            ) : (
                <Grid
                    className={"wby-px-sm-extra wby-py-xs-plus wby-outline-none"}
                    cellRenderer={renderCell()}
                    columnCount={COLUMN_COUNT}
                    columnWidth={COLUMN_WIDTH}
                    rowHeight={ROW_HEIGHT}
                    width={GRID_WIDTH}
                    height={GRID_HEIGHT}
                    rowCount={Math.ceil(props.iconsLength / COLUMN_COUNT)}
                />
            )}
        </div>
    );
};

export { IconPickerGrid, type IconPickerGridProps };

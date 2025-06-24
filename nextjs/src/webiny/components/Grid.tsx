import React, { Fragment } from "react";

interface GridColumnProps {
    children: React.ReactNode;
}

export const GridColumn = ({ children }: GridColumnProps) => {
    return <div style={{ padding: 10 }}>{children}</div>;
};

export interface Column {
    children: React.ReactNode;
}

interface GridProps {
    gridLayout: string;
    rowCount: number;
    columnGap: number;
    columns: Column[];
}

export const Grid = ({ gridLayout = "12", columns, columnGap }: GridProps) => {
    const rowConfig = gridLayout.split("-").map(size => parseInt(size));
    const rows: Column[][] = [];

    // Chunk columns into rows
    for (let i = 0; i < columns.length; i += rowConfig.length) {
        rows.push(columns.slice(i, i + rowConfig.length));
    }

    // Number of pixels we need to subtract from each cell to ensure they fit in the grid with column gap
    const cellWidthReduction = columnGap ? columnGap - columnGap / rowConfig.length : 0;

    return (
        <>
            {rows.map(columns => {
                return columns.map((column, i) => (
                    <Span key={i} size={rowConfig[i]} reductionInPx={cellWidthReduction}>
                        <GridColumn key={i}>{column.children}</GridColumn>
                    </Span>
                ));
            })}
        </>
    );
};

interface SpanProps {
    size: number;
    reductionInPx: number;
    children: React.ReactNode;
}

const Span = ({ size, children, reductionInPx }: SpanProps) => {
    const width = `calc(${(size / 12) * 100}% - ${reductionInPx}px)`;

    return (
        <div
            style={{
                flex: `0 0 ${width}`,
                maxWidth: width,
                boxSizing: "border-box"
            }}
        >
            {children}
        </div>
    );
};

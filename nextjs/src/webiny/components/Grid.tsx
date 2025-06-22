import React, { Fragment } from "react";

interface GridColumnProps {
    children: React.ReactNode;
}

export const GridColumn = ({ children }: GridColumnProps) => {
    return <div style={{ padding: 10 }}>{children}</div>;
};

interface Column {
    children: React.ReactNode;
}

interface Row {
    columns: Column[];
}

interface GridProps {
    gridLayout: string;
    rows: Row[];
}

export const Grid = ({ gridLayout = "12", rows }: GridProps) => {
    const sizes = gridLayout.split("-").map(size => parseInt(size));

    // const cellWidthReduction = value.columnGap
    //     ? `${value.columnGap - value.columnGap / columnsCount}px`
    //     : null; // Number of pixels we need to subtract from each cell to ensure they fit in the grid with column gap

    return (
        <>
            {rows.map((row, i) => (
                <Fragment key={i}>
                    {row.columns.map((column, i) => (
                        <Span key={i} size={sizes[i]}>
                            <GridColumn key={i}>{column.children}</GridColumn>
                        </Span>
                    ))}
                </Fragment>
            ))}
        </>
    );
};

interface SpanProps {
    size: number;
    children: React.ReactNode;
}

const Span = ({ size, children }: SpanProps) => {
    const width = `${(size / 12) * 100}%`;

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

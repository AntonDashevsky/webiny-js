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

export const Grid = ({ gridLayout, rows }: GridProps) => {
    const sizes = gridLayout.split("-").map(size => parseInt(size));

    return (
        <div style={{ display: "flex", flexWrap: "wrap", width: "inherit" }}>
            {rows.map((row, i) => (
                <Fragment key={i}>
                    {row.columns.map((column, i) => (
                        <Span key={i} size={sizes[i]}>
                            <GridColumn key={i}>{column.children}</GridColumn>
                        </Span>
                    ))}
                </Fragment>
            ))}
        </div>
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

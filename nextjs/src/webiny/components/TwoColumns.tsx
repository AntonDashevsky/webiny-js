import React from "react";

interface TwoColumnsProps {
    title: string;
    leftColumn: React.ReactNode;
    rightColumn: React.ReactNode;
}

export const TwoColumns = ({ title, leftColumn, rightColumn }: TwoColumnsProps) => {
    return (
        <div>
            <h2>{title ?? "Default title"}</h2>
            <div className="flex flex-col mb-4">
                <div className="w-full">{leftColumn}</div>
                <div className="w-full">{rightColumn}</div>
            </div>
        </div>
    );
};

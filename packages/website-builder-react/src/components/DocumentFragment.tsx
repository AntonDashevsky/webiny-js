"use client";
import React from "react";

export interface DocumentFragmentProps {
    name: string;
    children: React.ReactNode;
}

export function DocumentFragment({ children }: DocumentFragmentProps) {
    return <>{children}</>;
}

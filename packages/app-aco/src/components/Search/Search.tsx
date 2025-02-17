import React from "react";
import SearchUI from "@webiny/app-admin/components/SearchUI.js";

import { SearchWrapper } from "./styled.js";

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
}

export const Search = ({ value, onChange }: SearchProps) => {
    return (
        <SearchWrapper>
            <SearchUI value={value} onChange={onChange} />
        </SearchWrapper>
    );
};

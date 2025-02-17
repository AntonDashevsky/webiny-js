import React from "react";
import { ReactComponent as SearchIcon } from "@material-design-icons/svg/outlined/search.svg";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange/index.js";
import { InputContainer, SearchIconContainer } from "./SearchInput.styled.js";
import { useTrashBin } from "~/Presentation/hooks/index.js";

export const SearchInput = () => {
    const { vm, searchItems } = useTrashBin();

    return (
        <InputContainer>
            <SearchIconContainer icon={<SearchIcon />} />
            <DelayedOnChange
                value={vm.searchQuery}
                onChange={value => {
                    if (value === vm.searchQuery) {
                        return;
                    }
                    searchItems(value);
                }}
            >
                {({ value, onChange }) => (
                    <input
                        id={"trash-bin__search-input"}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        placeholder={vm.searchLabel}
                        data-testid={"trash-bin.search-input"}
                    />
                )}
            </DelayedOnChange>
        </InputContainer>
    );
};

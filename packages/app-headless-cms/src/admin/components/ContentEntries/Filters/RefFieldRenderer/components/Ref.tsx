import React, { useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce.js";
import { observer } from "mobx-react-lite";
import { useBind } from "@webiny/form";
import { EntriesGraphQLGateway } from "../adapters/index.js";
import { entryRepositoryFactory } from "../domain/index.js";
import { AutoComplete } from "./AutoComplete.js";
import { RefPresenter } from "./RefPresenter.js";
import { ContentEntryListConfig } from "~/admin/config/contentEntries/index.js";
import { useApolloClient } from "~/admin/hooks/index.js";

const { useInputField } = ContentEntryListConfig.Browser.AdvancedSearch.FieldRenderer;

export const Ref = () => {
    const { name } = useInputField();
    const { value } = useBind({ name });

    return <RefWithValue value={value} />;
};

interface RefProps {
    value: string | undefined;
}

const RefWithValue = observer(({ value }: RefProps) => {
    const { name, field } = useInputField();
    const client = useApolloClient();

    const presenter = useMemo<RefPresenter>(() => {
        const gateway = new EntriesGraphQLGateway(client);
        const repository = entryRepositoryFactory.getRepository(gateway, field.settings.modelIds);
        return new RefPresenter(repository);
    }, [client, field.settings.modelIds]);

    useEffect(() => {
        presenter.load(value);
    }, [value]);

    const onInput = useCallback(
        debounce(value => presenter.search(value), 250),
        [presenter.search]
    );

    return <AutoComplete name={name} onInput={onInput} vm={presenter.vm} />;
});

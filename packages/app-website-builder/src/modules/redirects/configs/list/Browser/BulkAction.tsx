import React, { useCallback, useEffect, useMemo, useRef } from "react";
import type { CallbackParams } from "@webiny/app-admin";
import { useButtons, useDialogWithReport, Worker } from "@webiny/app-admin";
import { Property, useIdGenerator } from "@webiny/react-properties";
import { useDocumentList } from "~/modules/redirects/RedirectsList/useDocumentList.js";
import { Redirect, type RedirectDto, RedirectDtoMapper } from "~/domain/Redirect/index.js";
import type { TableRow } from "~/modules/redirects/RedirectsList/presenters/index.js";
import { useSelectRedirects } from "~/features/redirects/selectRedirects/useSelectRedirects";

export interface BulkActionConfig {
    name: string;
    element: React.ReactElement;
}

export interface BulkActionProps {
    name: string;
    remove?: boolean;
    before?: string;
    after?: string;
    element?: React.ReactElement;
}

export const BaseBulkAction = ({
    name,
    after = undefined,
    before = undefined,
    remove = false,
    element
}: BulkActionProps) => {
    const getId = useIdGenerator("bulkAction");

    const placeAfter = after !== undefined ? getId(after) : undefined;
    const placeBefore = before !== undefined ? getId(before) : undefined;

    return (
        <Property id="browser" name={"browser"}>
            <Property
                id={getId(name)}
                name={"bulkActions"}
                remove={remove}
                array={true}
                before={placeBefore}
                after={placeAfter}
            >
                <Property id={getId(name, "name")} name={"name"} value={name} />
                {element ? (
                    <Property id={getId(name, "element")} name={"element"} value={element} />
                ) : null}
            </Property>
        </Property>
    );
};

const useWorker = () => {
    const { vm } = useDocumentList();
    const { selectRedirects } = useSelectRedirects<TableRow>();
    const { current: worker } = useRef(new Worker<RedirectDto>());

    const items = useMemo(() => {
        const redirects = vm.selected.map(item => Redirect.create(item.data));
        return redirects.map(redirect => RedirectDtoMapper.toDTO(redirect));
    }, [vm.selected]);

    useEffect(() => {
        worker.items = items;
    }, [items.length]);

    // Reset selected items in both useDocumentList and Worker
    const resetItems = useCallback(() => {
        worker.items = [];
        selectRedirects([]);
    }, []);

    // Reset results in Worker
    const resetResults = useCallback(async () => {
        worker.resetResults();
    }, []);

    return {
        items,
        process: (callback: (redirects: RedirectDto[]) => void) => worker.process(callback),
        processInSeries: async (
            callback: ({ item, allItems, report }: CallbackParams<RedirectDto>) => Promise<void>,
            chunkSize?: number
        ) => worker.processInSeries(callback, chunkSize),
        resetItems: resetItems,
        results: worker.results,
        resetResults
    };
};

export const BulkAction = Object.assign(BaseBulkAction, {
    useButtons,
    useWorker,
    useDialog: useDialogWithReport
});

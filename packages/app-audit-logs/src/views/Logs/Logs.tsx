import React, { useCallback, useRef, useState, useEffect } from "react";
import debounce from "lodash/debounce.js";

import { i18n } from "@webiny/app/i18n/index.js";
import EmptyView from "@webiny/app-admin/components/EmptyView.js";
import { Scrollbar } from "@webiny/ui/Scrollbar/index.js";
import { useSecurity } from "@webiny/app-security";

import { LoadingMore } from "~/views/Logs/LoadingMore/index.js";
import { LoadMoreButton } from "~/views/Logs/LoadMoreButton/index.js";
import { Header } from "~/views/Logs/Header/index.js";
import { Filters } from "~/views/Logs/Filters/index.js";
import { Table } from "~/views/Logs/Table/index.js";
import { Preview } from "~/views/Logs/Preview/index.js";
import { useAuditLogsList } from "~/hooks/index.js";
import { Entry } from "~/utils/transformCmsContentEntriesToRecordEntries.js";
import { MainContainer, Wrapper } from "./styled.js";

const t = i18n.ns("app-audit-logs/views/logs");

const AuditLogsView = () => {
    const [selectedAuditLog, setSelectedAuditLog] = useState<Entry | null>(null);
    const handleAuditLogSelect = useCallback(
        (auditLog: Entry) => setSelectedAuditLog(auditLog),
        []
    );
    const closePreviewModal = useCallback(() => setSelectedAuditLog(null), []);

    const { innerHeight: windowHeight } = window;
    const [tableHeight, setTableHeight] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);

    const { getPermissions } = useSecurity();
    const hasAccessToUsers = Boolean(getPermissions("adminUsers").length);

    const list = useAuditLogsList(hasAccessToUsers);

    useEffect(() => {
        setTableHeight(tableRef?.current?.clientHeight || 0);

        return () => {
            setTableHeight(0);
        };
    });

    const loadMoreOnScroll = debounce(({ scrollFrame }) => {
        if (scrollFrame.top > 0.8) {
            list.listMoreRecords();
        }
    }, 200);

    return (
        <>
            <MainContainer>
                <Header
                    title="Audit Logs"
                    searchValue={list.search}
                    onSearchChange={list.setSearch}
                    showingFilters={list.showingFilters}
                    showFilters={list.showFilters}
                    hideFilters={list.hideFilters}
                />
                <Wrapper>
                    <Filters
                        showingFilters={list.showingFilters}
                        setFilters={list.setFilters}
                        hasAccessToUsers={hasAccessToUsers}
                    />
                    {list.records.length === 0 && !list.isListLoading ? (
                        <EmptyView title={t`No results found.`} action={null} />
                    ) : (
                        <>
                            <Preview
                                auditLog={selectedAuditLog}
                                onClose={() => closePreviewModal()}
                                hasAccessToUsers={hasAccessToUsers}
                            />
                            <Scrollbar
                                data-testid="default-data-list"
                                onScrollFrame={scrollFrame => loadMoreOnScroll({ scrollFrame })}
                            >
                                <Table
                                    ref={tableRef}
                                    records={list.records}
                                    loading={list.isListLoading}
                                    handleRecordSelect={handleAuditLogSelect}
                                    sorting={list.sorting}
                                    onSortingChange={list.setSorting}
                                    hasAccessToUsers={hasAccessToUsers}
                                />
                                <LoadMoreButton
                                    show={!list.isListLoading && list.meta.hasMoreItems}
                                    disabled={list.isListLoadingMore}
                                    windowHeight={windowHeight}
                                    tableHeight={tableHeight}
                                    onClick={list.listMoreRecords}
                                />
                            </Scrollbar>
                            {list.isListLoadingMore && <LoadingMore />}
                        </>
                    )}
                </Wrapper>
            </MainContainer>
        </>
    );
};

export default AuditLogsView;

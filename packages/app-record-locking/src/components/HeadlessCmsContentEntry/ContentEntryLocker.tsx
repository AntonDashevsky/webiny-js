import React, { useEffect, useRef } from "react";
import { useRecordLocking } from "~/hooks/index.js";
import type { IRecordLockingIdentity, IRecordLockingLockRecord } from "~/types.js";
import type { IncomingGenericData } from "@webiny/app-websockets";
import { useWebsockets } from "@webiny/app-websockets";
import { parseIdentifier } from "@webiny/utils";
import { useDialogs } from "@webiny/app-admin";
import styled from "@emotion/styled";
import { type CmsContentEntry, type CmsModel } from "@webiny/app-headless-cms/types.js";

const autoUpdateTimeout = 20;

const Bold = styled.span`
    font-weight: 600;
`;

export interface IContentEntryLockerProps {
    entry: CmsContentEntry;
    model: CmsModel;
    onEntryUnlocked: () => void;
    onDisablePrompt: (flag: boolean) => void;
    children: React.ReactElement;
}

export interface IKickOutWebsocketsMessage extends IncomingGenericData {
    data: {
        record: IRecordLockingLockRecord;
        user: IRecordLockingIdentity;
    };
}
interface IForceUnlockedProps {
    user: IRecordLockingIdentity;
}
const ForceUnlocked = ({ user }: IForceUnlockedProps) => {
    return (
        <>
            The entry you were editing was forcefully unlocked by{" "}
            <Bold>{user.displayName || "Unknown user"}</Bold>. Unfortunately, this means you lost
            the unsaved changes.
        </>
    );
};

export const ContentEntryLocker = ({
    onEntryUnlocked,
    onDisablePrompt,
    entry,
    model,
    children
}: IContentEntryLockerProps) => {
    const { updateEntryLock, removeEntryLock } = useRecordLocking();
    const websockets = useWebsockets();
    const { showDialog } = useDialogs();

    const entryLockerTimeout = useRef<number | null>(null);

    useEffect(() => {
        if (!entry.id) {
            return;
        }
        const { id: entryId } = parseIdentifier(entry.id);

        let onMessageSub = websockets.onMessage<IKickOutWebsocketsMessage>(
            `recordLocking.entry.kickOut.${entryId}`,
            async incoming => {
                const { user } = incoming.data;
                onDisablePrompt(true);
                removeEntryLock({
                    id: entryId,
                    $lockingType: model.modelId
                });
                showDialog({
                    title: "Entry was forcefully unlocked!",
                    content: <ForceUnlocked user={user} />,
                    acceptLabel: "Ok",
                    onClose: undefined,
                    cancelLabel: undefined
                });
                onEntryUnlocked();
            }
        );

        return () => {
            onMessageSub.off();
            /**
             * Lets null subscriptions, just in case it...
             */
            // @ts-expect-error
            onMessageSub = null;
        };
    }, [entry.id, onEntryUnlocked, model.modelId]);

    useEffect(() => {
        if (!entry.id) {
            return;
        }

        if (entryLockerTimeout.current) {
            return;
        }

        const updateLock = async () => {
            const result = await updateEntryLock({
                id: entry.id,
                $lockingType: model.modelId
            });
            if (result.error) {
                showDialog({
                    title: "There was an error while updating the entry lock.",
                    content: result.error.message,
                    acceptLabel: "Ok",
                    onClose: undefined,
                    cancelLabel: undefined
                });
                onEntryUnlocked();
                return;
            }
            createTimeout();
        };

        const createTimeout = () => {
            entryLockerTimeout.current = window.setTimeout(() => {
                updateLock();
            }, autoUpdateTimeout * 1000);
        };

        updateLock();
        return () => {
            if (!entryLockerTimeout.current) {
                return;
            }
            clearTimeout(entryLockerTimeout.current);
            entryLockerTimeout.current = null;
        };
    }, [entry.id, onEntryUnlocked]);

    return <>{children}</>;
};

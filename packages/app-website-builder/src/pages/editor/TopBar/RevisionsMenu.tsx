import React, { useState, useEffect, useCallback } from "react";
import { Button, DropdownMenu } from "@webiny/admin-ui";
import { ReactComponent as ArrowDown } from "@webiny/icons/keyboard_arrow_down.svg";
import { ReactComponent as Draft } from "@webiny/icons/draw.svg";
import { ReactComponent as Unpublished } from "@webiny/icons/lock.svg";
import { ReactComponent as Published } from "@webiny/icons/remove_red_eye.svg";
import { useRouter } from "@webiny/react-router";
import { useGetPageRevisions } from "~/features/pages";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { PageRevision } from "~/domains/PageRevision";
import { PAGE_EDITOR_ROUTE } from "~/constants";

const { Item } = DropdownMenu;

const statusIcon: Record<string, JSX.Element> = {
    draft: <Draft />,
    published: <Published />,
    unpublished: <Unpublished />
};

export const RevisionsMenu = () => {
    const { history, search } = useRouter();
    const [revisions, setRevisions] = useState<PageRevision[]>([]);
    const { loading, getPageRevisions } = useGetPageRevisions();
    const { id } = useSelectFromDocument(document => {
        return { id: document.id };
    });

    useEffect(() => {
        getPageRevisions({ pageId: id }).then(revisions => {
            setRevisions(
                revisions
                    .sort((a, b) => {
                        return new Date(a.savedOn).getTime() - new Date(b.savedOn).getTime();
                    })
                    .reverse()
            );
        });
    }, []);

    const currentRevision = revisions.find(r => r.id === id);

    const goToRevision = useCallback((id: string) => {
        const folderId = encodeURIComponent(search[0].get("folderId") ?? "");
        const url = `${PAGE_EDITOR_ROUTE}/${encodeURIComponent(id)}?folderId=${folderId}`;

        history.push(url);
    }, []);

    return (
        <DropdownMenu
            trigger={
                <Button
                    disabled={loading}
                    variant="ghost"
                    text={currentRevision ? currentRevision.getLabel() : "Loading..."}
                    icon={<ArrowDown />}
                    iconPosition={"end"}
                />
            }
        >
            {revisions.map(revision => (
                <Item
                    key={revision.id}
                    className={"wby-cursor-pointer"}
                    onClick={() => goToRevision(revision.id)}
                    icon={
                        <Item.Icon
                            label={revision.getLabel()}
                            element={statusIcon[revision.status]}
                        />
                    }
                    text={revision.getLabel()}
                />
            ))}
        </DropdownMenu>
    );
};

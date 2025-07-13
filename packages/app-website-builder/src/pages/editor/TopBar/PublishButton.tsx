import React from "react";
import { Button, useToast } from "@webiny/admin-ui";
import { useDialogs } from "@webiny/app-admin";
import { ReactComponent as PublishIcon } from "@webiny/icons/publish.svg";
import { usePublishPage } from "~/features/pages";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";

export const PublishButton = () => {
    const { showSuccessToast } = useToast();
    const { publishPage } = usePublishPage();
    const { showDialog } = useDialogs();
    const { id } = useSelectFromDocument(document => {
        return { id: document.id };
    });

    const publish = () => {
        showDialog({
            title: "Publish page",
            icon: <PublishIcon />,
            content: "You're about to publish this page. Are you sure you want to continue?",
            acceptLabel: "Yes, publish this page!",
            cancelLabel: "Cancel",
            onAccept: async () => {
                await publishPage({ id });
                showSuccessToast({
                    title: "Page was published successfully!"
                });
            }
        });
    };

    return (
        <Button
            variant="primary"
            text={"Publish"}
            onClick={publish}
            icon={<PublishIcon />}
        ></Button>
    );
};

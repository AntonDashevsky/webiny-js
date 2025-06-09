import React from "react";
import { ReactComponent as ErrorIcon } from "@material-design-icons/svg/round/error.svg";
import { ReactComponent as SuccessIcon } from "@material-design-icons/svg/round/check_circle.svg";
import { Icon } from "@webiny/ui/Icon/index.js";
import { List, ListItemText, ListItemTextPrimary, ListItemTextSecondary } from "@webiny/ui/List/index.js";
import { type ShowResultsDialogParams } from "./index.js";

import { ListItem, ListItemGraphic, MessageContainer } from "./useDialogWithReport.styled.js";

type ResultDialogMessageProps = Pick<ShowResultsDialogParams, "results" | "message">;

export const ResultDialogMessage = ({ results, message }: ResultDialogMessageProps) => {
    return (
        <>
            {message && <MessageContainer>{message}</MessageContainer>}
            <List nonInteractive={true} twoLine={true}>
                {results.map((result, index) => (
                    <ListItem key={`item-${index}`} ripple={false}>
                        <ListItemGraphic status={result.status}>
                            <Icon
                                icon={result.status === "success" ? <SuccessIcon /> : <ErrorIcon />}
                            />
                        </ListItemGraphic>
                        <ListItemText>
                            <ListItemTextPrimary>{result.title}</ListItemTextPrimary>
                            <ListItemTextSecondary>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: `${result.message}`
                                    }}
                                ></span>
                            </ListItemTextSecondary>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

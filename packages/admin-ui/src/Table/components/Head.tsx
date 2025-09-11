import * as React from "react";
import { cn } from "~/utils.js";

const Head = ({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
        className={cn(
            [
                "wby-box-border wby-relative wby-px-md wby-py-sm wby-text-sm wby-text-left wby-align-middle wby-font-normal wby-text-neutral-strong wby-fill-neutral-xstrong",
                "hover:wby-bg-neutral-subtle",
                "wby-overflow-hidden wby-whitespace-nowrap wby-truncate",
                "[&:has([role=checkbox])]:wby-pl-lg",
                "wby-text-0 wby-leading-none"
            ],
            className
        )}
        {...props}
    >
        {children}
    </th>
);

export { Head };

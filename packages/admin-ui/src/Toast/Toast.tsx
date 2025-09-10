import * as React from "react";
import { Toaster, type ToasterProps } from "sonner";
import { makeDecoratable, withStaticProps } from "~/utils";
import { type IconButtonProps } from "~/Button";
import type { Icon as BaseIcon } from "~/Icon";
import { Portal } from "~/Portal";
import {
    ToastActions,
    ToastClose,
    ToastDescription,
    ToastIcon,
    ToastRoot,
    ToastTitle,
    type ToastRootProps
} from "./components";

interface ToastProps extends Omit<ToastRootProps, "title" | "content" | "children"> {
    title: React.ReactElement<typeof ToastTitle>;
    description?: React.ReactElement<typeof ToastDescription>;
    icon?: React.ReactElement<typeof BaseIcon>;
    actions?: React.ReactElement<typeof ToastActions>;
    onCloseClick: () => void;
    dismissible?: boolean;
}

const DecoratableToast = ({
    title,
    description,
    icon,
    actions,
    onCloseClick,
    dismissible = true,
    ...props
}: ToastProps) => {
    return (
        <ToastRoot hasDescription={!!description || !!actions} {...props}>
            <ToastIcon icon={icon} />
            <div className="wby-w-64">
                {title}
                {description && description}
                {actions && actions}
            </div>
            {dismissible && (
                <ToastClose
                    onClick={onCloseClick}
                    variant={
                        props.variant === "subtle"
                            ? ("subtle" as IconButtonProps["variant"])
                            : ("ghost-negative" as IconButtonProps["variant"])
                    }
                />
            )}
        </ToastRoot>
    );
};

const Toast = withStaticProps(makeDecoratable("Toast", DecoratableToast), {
    Title: ToastTitle,
    Description: ToastDescription,
    Actions: ToastActions,
    Provider: (props: ToasterProps) => (
        <Portal>
            <Toaster expand={true} duration={6000} position={"bottom-left"} {...props} />
        </Portal>
    )
});

export { Toast, type ToastProps };

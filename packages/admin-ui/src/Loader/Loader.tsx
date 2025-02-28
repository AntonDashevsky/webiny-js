import React, { useState, useEffect } from "react";
import { Text } from "~/Text";
import { cn, cva, makeDecoratable, type VariantProps } from "~/utils";

const loaderVariants = cva("wby-relative wby-translate", {
    variants: {
        size: {
            xs: "wby-size-[16px]",
            sm: "wby-size-[20px]",
            md: "wby-size-[24px]",
            lg: "wby-size-[40px]"
        }
    },
    defaultVariants: {
        size: "md"
    }
});

const loaderBaseVariant = cva("wby-stroke ", {
    variants: {
        variant: {
            accent: "wby-opacity-10 wby-text-neutral-primary",
            subtle: "wby-opacity-10 wby-text-neutral-primary",
            negative: "wby-opacity-20 wby-text-neutral-light"
        }
    },
    defaultVariants: {
        variant: "accent"
    }
});

const loaderActiveVariant = cva("wby-opacity-100", {
    variants: {
        variant: {
            accent: "wby-text-accent-primary",
            subtle: "wby-opacity-50 wby-text-neutral-primary",
            negative: "wby-text-neutral-light"
        }
    },
    defaultVariants: {
        variant: "accent"
    }
});

interface LoaderProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof loaderVariants>,
        VariantProps<typeof loaderBaseVariant> {
    max?: number;
    value?: number;
    min?: number;
    className?: string;
    indeterminate?: boolean;
    text?: React.ReactNode;
}

const DecoratableLoader = ({
    max = 100,
    min = 0,
    value = 66,
    indeterminate = true,
    className,
    size,
    variant,
    text,
    ...props
}: LoaderProps) => {
    const circumference = 2 * Math.PI * 45;
    const percentPx = circumference / 100;
    const currentPercent = Math.round(((value - min) / (max - min)) * 100);

    const [rotation, setRotation] = useState(0);
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (indeterminate) {
            // Rotate the loader by 10 degrees every 30ms when indeterminate
            interval = setInterval(() => {
                setRotation(prev => (prev + 10) % 360);
            }, 30);
        } else {
            setRotation(0);
        }
        return () => clearInterval(interval);
    }, [indeterminate]);

    return (
        <div {...props} className={"wby-text-center wby-flex wby-flex-col wby-items-center"}>
            <div className={cn(loaderVariants({ size }), className)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="wby-size-full wby-stroke-current"
                    strokeWidth="12"
                    viewBox="0 0 100 100"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="44"
                        strokeDashoffset="0"
                        className={cn(loaderBaseVariant({ variant }))}
                        style={{
                            strokeDasharray: `${circumference}px ${circumference}px`,
                            transition: "all 1s ease 0s",
                            transformOrigin: "50px 50px"
                        }}
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="44"
                        strokeDashoffset="0"
                        className={cn(loaderActiveVariant({ variant }))}
                        style={{
                            strokeDasharray: `${currentPercent * percentPx}px ${circumference}px`,
                            transition: indeterminate ? "none" : "500ms ease 0s",
                            transitionProperty: indeterminate
                                ? "transform"
                                : "stroke-dasharray, transform",
                            transform: indeterminate
                                ? `rotate(${rotation}deg)` // Rotate when indeterminate
                                : "rotate(-90deg)",
                            transformOrigin: "50px 50px"
                        }}
                    />
                </svg>
            </div>
            {text && (
                <Text
                    text={text}
                    as={"div"}
                    className={"wby-text-neutral-strong wby-w-full wby-pt-sm-plus"}
                />
            )}
        </div>
    );
};

const Loader = makeDecoratable("Loader", DecoratableLoader);

export { Loader, type LoaderProps };

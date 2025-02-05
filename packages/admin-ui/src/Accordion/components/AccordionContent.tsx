import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { makeDecoratable, cva, type VariantProps, cn } from "~/utils";

const accordionContentVariants = cva(
    [
        "wby-overflow-hidden wby-text-md",
        "wby-transition-all data-[state=closed]:wby-animate-accordion-up data-[state=open]:wby-animate-accordion-down"
    ],
    {
        variants: {
            withIcon: {
                true: "wby-pl-[36px]"
            },
            withHandle: {
                true: "wby-pl-[20px]"
            }
        },
        compoundVariants: [
            {
                withIcon: true,
                withHandle: true,
                className: "wby-pl-[56px]"
            }
        ],
        defaultVariants: {
            withIcon: false,
            withHandle: false
        }
    }
);

export interface AccordionContentProps
    extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
        VariantProps<typeof accordionContentVariants> {}

const AccordionContentBase = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    AccordionContentProps
>(({ children, withIcon, withHandle, ...props }, ref) => {
    return (
        <AccordionPrimitive.Content
            ref={ref}
            {...props}
            className={cn(accordionContentVariants({ withHandle, withIcon }), props.className)}
        >
            <div className={"wby-pt-sm wby-pb-lg wby-pl-md wby-pr-[52px]"}>{children}</div>
        </AccordionPrimitive.Content>
    );
});

AccordionContentBase.displayName = AccordionPrimitive.Content.displayName;

export const AccordionContent = makeDecoratable("AccordionContent", AccordionContentBase);

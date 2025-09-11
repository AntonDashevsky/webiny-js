import React from "react";
import { makeDecoratable, type VariantProps } from "~/utils.js";
import type { cardRootVariants } from "./components/index.js";
import { CardFooter, CardHeader, CardRoot, type CardRootProps } from "./components/index.js";

interface CardProps extends CardRootProps, VariantProps<typeof cardRootVariants> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    options?: React.ReactNode;
}

const CardBase = (props: CardProps) => {
    const { title, description, actions, children, options, ...rest } = props;

    return (
        <CardRoot {...rest}>
            <CardHeader title={title} description={description} options={options} />
            {children}
            <CardFooter actions={actions} />
        </CardRoot>
    );
};

const Card = makeDecoratable("Card", CardBase);

export { Card, type CardProps };

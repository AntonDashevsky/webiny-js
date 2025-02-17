import React from "react";
import { Skeleton } from "@webiny/ui/Skeleton/index.js";
import { Container, SkeletonWrapper } from "./styled.js";

export const Loader = ({ count }: { count?: number }) => {
    return (
        <Container>
            <Skeleton count={count ?? 4} inline={true} height={"100%"} wrapper={SkeletonWrapper} />
        </Container>
    );
};

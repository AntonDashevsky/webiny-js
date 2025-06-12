import React from "react";
import { useGetProduct } from "@/hooks/queries/product/useGetProduct/useGetProduct";
import { ProductCard } from "./ProductCard";

export interface ProductHighlightProps {
    title: string;
    productCode: string;
}

export const ProductHighlight = (props: ProductHighlightProps) => {
    const { productCode } = props;
    const { data: product } = useGetProduct({ productCode });

    const title = props.title ?? null;

    return (
        <div className="bg-white w-full">
            <div className="mx-auto max-w-2xl py-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
                </div>

                <div className="mt-6">
                    <ProductCard product={product} />
                </div>
            </div>
        </div>
    );
};

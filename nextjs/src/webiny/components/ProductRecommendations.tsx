import React from "react";
import { useGetProducts } from "@/hooks/queries/product/useGetProducts/useGetProducts";

import type { Product } from "@/lib/gql/types";
import { ProductCard } from "./ProductCard";

export interface ProductRecommendationsProps {
    title: string;
    productCodes: Array<string>;
}

const ProductRecommendations = (props: ProductRecommendationsProps) => {
    const { productCodes } = props;
    const { data: productSearchResult } = useGetProducts(productCodes);
    const products = (productSearchResult?.items ?? []) as Product[];

    const title = props.title ?? "Product Recommendations";

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="md:flex md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                    {products.map(product => {
                        return <ProductCard key={product.productCode} product={product} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductRecommendations;

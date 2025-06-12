import React from "react";
import Link from "next/link";
import { Product } from "@/lib/gql/types";
import { environment } from "@webiny/app-website-builder/sdk";

export const ProductCard = ({ product }: { product: Product }) => {
    if(!product) {
        return null;
    }

    const image = product.content?.productImages![0];

    return (
        <div key={product.productCode} className="group relative">
            <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                    alt={image!.altText!}
                    src={image!.imageUrl!}
                    className="size-full object-cover"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
                <Link href={`/product/${product.productCode}`}>
                    <span className="absolute inset-0" />
                    {product.content?.productName}
                </Link>
            </h3>
            <p className="mt-1 text-sm font-medium text-gray-900">{product.price?.price}</p>
        </div>
    );
};

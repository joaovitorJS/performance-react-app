import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>;
  onAddToWishlist: (id: number) => Promise<void>;
}

export function SearchResults({totalPrice, results, onAddToWishlist }: SearchResultsProps) {
/*
  const totalPrice = useMemo(() => { 
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, [results]);
*/

  return (
    <div>
      <h2>{totalPrice}</h2>

      {/* 
        <Component totalPrice={totalPrice} />
      */}

      {results?.map(product => {
        return (
          <ProductItem 
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        );
      })}
    </div>
  );
}
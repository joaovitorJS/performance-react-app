// import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

import { List, ListRowRenderer } from "react-virtualized";

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

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem 
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  }


  return (
    <div>
      <h2>{totalPrice}</h2>

      {/* 
        <Component totalPrice={totalPrice} />
      */}

      <List
        height={300}
        rowHeight={25}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results?.map(product => {
        return (
          <ProductItem 
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        );
      })} */}
    </div>
  );
}
import { forwardRef, memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishlist: (id: number) => Promise<void>;
}

/*
Por padrão o memo utiliza shalow compare (comparação rasa)
Ele faz a comparação {} === {} onde sempre retorna falso
Passamos uma função para ele, para verificar se deve ou não renderizar o componente
*/

function ProductItemComponent({ product,onAddToWishlist }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => onAddToWishlist(product.id)}>Add to Wishlist</button>
    </div>
  );
}

function areEqual(prevProps: Readonly<ProductItemProps>, nextProps: Readonly<ProductItemProps>) {
  return Object.is(prevProps.product, nextProps.product); /*Comparação profunda -> utiliza um pouco mais de processamento*/
}

export const ProductItem = memo(ProductItemComponent, areEqual);
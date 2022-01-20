import { forwardRef, memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
}

/*
Por padrão o memo utiliza shalow compare (comparação rasa)
Ele faz a comparação {} === {} onde sempre retorna falso
Passamos uma função para ele, para verificar se deve ou não renderizar o componente
*/

function ProductItemComponent({ product }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  return Object.is(prevProps.product, nextProps.product); /*Comparação profunda -> utiliza um pouco mais de processamento*/
}

export const ProductItem = memo(ProductItemComponent, areEqual);
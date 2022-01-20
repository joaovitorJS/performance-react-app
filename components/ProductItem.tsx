import { memo, useState } from "react";
import dynamic from "next/dynamic"; /*Mesmo que o React.lazy() porém  para o SSR*/
// import { AddProductToWishlist } from "./AddProductToWishlist";
import { AddProductToWishlistProps } from "./AddProductToWishlist";

import lodash from "lodash";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist) /*.then para apenas export, para export default não precisa*/
}, {
  loading: () => <span>Carregando...</span>
})

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
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false); 

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      { isAddingToWishlist &&
        <AddProductToWishlist 
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      }
    </div>
  );
}

function areEqual(prevProps: Readonly<ProductItemProps>, nextProps: Readonly<ProductItemProps>) {
  return lodash.isEqual(prevProps.product, nextProps.product); /*Comparação profunda -> utiliza um pouco mais de processamento*/
}

export const ProductItem = memo(ProductItemComponent, areEqual);
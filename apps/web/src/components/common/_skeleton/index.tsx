import React from "react";

type RepetidorProps = {
  elemento: React.JSX.Element,
  vezes: number
}

/**
 * Componente utilitário que repete um outro elemento N vezes
 */
export function Repetidor({ elemento, vezes }: RepetidorProps) {
  return (
    <>
      {Array.from({ length: vezes }).map((_, index) => (
        React.cloneElement(elemento, { key: index })
      ))}
    </>
  );
}

export * from "./VendaSkeleton";
export * from "./ProdutoItemSkeleton";
export * from "./CategoriaProdutoSkeleton";
export * from "./CategoriaInsumoSkeleton";
export * from "./InsumoCardSkeleton";
export * from "./PrecificacaoSkeleton";
export * from "./DescontoGlobalSkeleton";
export * from "./DescontoProdutoSkeleton";
export * from "./ProdutoPrecosSkeleton";
export * from "./AdminUsuarioListSkeleton";
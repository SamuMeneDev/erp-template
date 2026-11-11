import { Field, FieldLabel, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, NativeSelect, NativeSelectOption, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/components/ui";
import { ListFilter, SearchIcon } from "lucide-react";
import { Pagination } from "../Pagination";
import { InsumoCard } from "./InsumoCard";
import { useInsumoFindAll } from "@erp-template/services";
import type { InsumoResponse } from "@erp-template/types/response/InsumoResponse";
import { useSearchParams } from "react-router";
import type { PagedResponse } from "@erp-template/types";
import { useParamsDebounce } from "@/hooks/use-debouncer";
import { useState } from "react";
import { InsumoCardSkeleton, Repetidor } from "../_skeleton";

/**
 * Componente que desacopla a listagem dos insumos
 */
export function InsumoListView() {

    /**
     * Parametros de busca da URL, para filtrar a listagem dos insumos.
     * 
     * @example
     * /insumos?nome=farinha&page=1&size=10
     * 
     * @returns Retorna os parametros de busca da URL, e uma função para atualizar os parametros.
     */
    const [params, _] = useSearchParams();

    const { data, isPending } = useInsumoFindAll(params);
    return (
        <div className="mb-20">
            <InsumoListViewFilter data={data?.data} />
            <div className="flex gap-5 justify-evenly flex-wrap">
                {data?.data &&
                data.data.content.map((insumo: InsumoResponse)=><InsumoCard insumo={insumo} key={insumo.id} />)}

                {isPending && 
                <Repetidor elemento={<InsumoCardSkeleton />} vezes={10} />}

                {data?.data && data.data.content.length < 1 &&
                <span className="text-stone-500">Nenhum insumo encontrado</span>}
            </div>
        </div>
    )
}

type InsumoListViewFilterProps = {
    data?: PagedResponse<InsumoResponse>;
}

function InsumoListViewFilter({ data }: InsumoListViewFilterProps) {
    const [displayValue, _, updateValue] = useParamsDebounce("nome", 500);
    return (
        <div className="flex gap-3 py-3 flex-col w-full">
            <InputGroup className="max-w-lg">
                <InputGroupInput value={displayValue} onChange={(e)=>updateValue(e.target.value)} placeholder="Buscar insumo" />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <FilterMenu />
            </InputGroup>
            <Pagination data={data} />
        </div>
    )
}

function FilterMenu() {

    const [_, __, updateValue] = useParamsDebounce("sort", 500);
    const [filtro, setFiltro] = useState("nome,desc");

    function handleFiltro(update: (filtro: string)=>void,nome?: string, ordem?: string) {
        const newFilter = `${nome?nome:''},${ordem?ordem:''}`;
        setFiltro(newFilter);
        update(newFilter);
    }

    return (
        <Popover>
            <PopoverTrigger render={
                <InputGroupButton>
                    <span>Filtrar</span>
                    <ListFilter />
                </InputGroupButton>
            }/>
            <PopoverContent className="max-w-sm">
                    <Field>
                        <FieldLabel>Ordenar por</FieldLabel>
                        <NativeSelect onChange={(e)=>handleFiltro(updateValue, filtro.split(",")[0], e.target.value)} value={filtro.split(",")[1]}>
                            <NativeSelectOption value="asc">Ordem crescente</NativeSelectOption>
                            <NativeSelectOption value="desc">Ordem decrescente</NativeSelectOption>
                        </NativeSelect>

                    </Field>
                    <Field className="w-full">
                        <ToggleGroup
                        defaultValue={["nome"]}
                        value={[filtro.split(",")[0]]}
                        variant="outline" 
                        className="flex flex-wrap"
                        onValueChange={(e)=>handleFiltro(updateValue, e[0], filtro.split(",")[1])}>
                            <ToggleGroupItem value="nome">Nome</ToggleGroupItem>
                            <ToggleGroupItem value="quantAtual">Quantidade atual</ToggleGroupItem>
                            <ToggleGroupItem value="preco">Preço</ToggleGroupItem>
                            <ToggleGroupItem value="dataCriacao">Data de criação</ToggleGroupItem>
                        </ToggleGroup>
                    </Field>

            </PopoverContent>
        </Popover>
    )
}

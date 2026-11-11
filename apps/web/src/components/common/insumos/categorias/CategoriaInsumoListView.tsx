
import { Field, FieldLabel, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, NativeSelect, NativeSelectOption, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/components/ui";
import { CategoriaInsumoCard } from "./CategoriaInsumoCard";
import { ListFilter, Search } from "lucide-react";
import { useCategoriaInsumoFindAll } from "@erp-template/services";
import type { CategoriaInsumoResponse, PagedResponse } from "@erp-template/types";
import { useSearchParams } from "react-router";
import { Pagination } from "../../Pagination";
import { useParamsDebounce } from "@/hooks/use-debouncer";
import { useState } from "react";
import { CategoriaInsumoSkeleton, Repetidor } from "../../_skeleton";

/**
 * Componente de visualização da lista de categorias e barra de pesquisa.
 */
export function CategoriaInsumoListView() {

    const [params, _] = useSearchParams();
    const { data, isPending } = useCategoriaInsumoFindAll(params);

    return (
        <div className="flex flex-col gap-10">
            <CategoriaInsumoListViewFilter data={data?.data} />


            <div className="flex flex-wrap gap-5">
                {data?.data &&
                data.data.content.map((cat: CategoriaInsumoResponse)=> <CategoriaInsumoCard key={cat.id} categoria={cat} />)}
                
                { isPending && <Repetidor elemento={<CategoriaInsumoSkeleton/>} vezes={6} /> }
                
                {data?.data && data.data.content.length < 1 &&
                <span className="text-stone-500">Nenhuma categoria encontrada</span>}
            </div>
        </div>
    )
}

type CategoriaInsumoListViewFilterProps = {
    data?: PagedResponse<CategoriaInsumoResponse>;
}
function CategoriaInsumoListViewFilter({ data }: CategoriaInsumoListViewFilterProps) {

    const [displayValue, _, updateValue] = useParamsDebounce("nome", 500);

    return (
        <div className="max-w-lg">
            <InputGroup>
                <InputGroupInput value={displayValue} onChange={(e)=>updateValue(e.target.value)} placeholder="Pesquisar categoria" />
                <InputGroupAddon >
                    <Search />
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
                            <ToggleGroupItem value="dataCriacao">Data de criação</ToggleGroupItem>
                        </ToggleGroup>
                    </Field>

            </PopoverContent>
        </Popover>
    )
}
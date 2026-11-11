import { Accordion, Button, Field, FieldLabel, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, NativeSelect, NativeSelectOption, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/components/ui";
import { useProdutoFindAll } from "@erp-template/services";
import type { PagedResponse, ProdutoResponse } from "@erp-template/types";
import { ProdutoItem } from "./ProdutoItem/ProdutoItem";
import { ProdutoItemProvider } from "@/contexts";
import { ListFilter, SearchIcon } from "lucide-react";
import { Pagination } from "../Pagination";
import { useSearchParams } from "react-router";
import { useParamsDebounce } from "@/hooks";
import { useState } from "react";
import { ProdutoItemSkeleton, Repetidor } from "../_skeleton";

/**
 * Representa o componente que lista todos os produtos em formato de acordeon.
 */
export function ProdutoListView() {


    const [params, _] = useSearchParams();
    const { data, isPending } = useProdutoFindAll(params);

    return (
        <div className="pb-35">
            <ProdutoListViewFilter data={data?.data} />
        <Accordion multiple className="gap-7">
            {data?.data && data.data.content.map((p: ProdutoResponse) => (
                <ProdutoItemProvider key={p.id} produto={p}>
                    <ProdutoItem />
                </ProdutoItemProvider>
            ))}
            { isPending && <Repetidor elemento={<ProdutoItemSkeleton />} vezes={3} />}
            
            { data?.data && data.data.content.length < 1 && 
            <span className="text-stone-500">Nenhum produto encontrado</span> }
        </Accordion>
        </div>
        
    )
}

type ProdutoListViewFilterProps = {
    data?: PagedResponse<ProdutoResponse>;
}
function ProdutoListViewFilter({ data }: ProdutoListViewFilterProps) {

    const [displayValue, _, updateValue] = useParamsDebounce("nome", 500);

    return (
        <div className="flex gap-3 py-3 flex-col max-w-lg">
            <InputGroup>
                <InputGroupInput 
                    aria-label="Filtrar resultados por palavra-chave" 
                    placeholder="Buscar produto" 
                    value={displayValue}
                    onChange={(e) => updateValue(e.target.value)}
                />
                <InputGroupAddon>
                    <Button type="button" variant="ghost" size="icon">
                        <SearchIcon />
                    </Button>
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
                            <ToggleGroupItem value="codigo">Código</ToggleGroupItem>
                            <ToggleGroupItem value="dataCriacao">Data de criação</ToggleGroupItem>
                        </ToggleGroup>
                    </Field>

            </PopoverContent>
        </Popover>
    )
}
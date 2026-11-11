import { Field, FieldLabel, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, NativeSelect, NativeSelectOption, Popover, PopoverContent, PopoverTrigger, ToggleGroup, ToggleGroupItem } from "@/components/ui";
import { ListFilter, Search } from "lucide-react";
import { Pagination } from "@/components/common";
import { useCategoriaProdutoFindAll } from "@erp-template/services";
import type { CategoriaProdutoResponse, PagedResponse } from "@erp-template/types";
import { CategoriaProdutoCard } from "./CategoriaProdutoCard";
import { useSearchParams } from "react-router";
import { useParamsDebounce } from "@/hooks";
import { useState } from "react";
import { CategoriaProdutoSkeleton, Repetidor } from "../../_skeleton";

export function CategoriaProdutoListView() {

    const [params, _] = useSearchParams();
    const { data, isPending } = useCategoriaProdutoFindAll(params);

    return (
        <div className="flex flex-col gap-3">
            <CategoriaProdutoListViewFilter data={data?.data} />
            <div className="flex flex-wrap gap-10">
                {data?.data && 
                data.data.content.map((cat: CategoriaProdutoResponse) => <CategoriaProdutoCard key={cat.id} categoria={cat} />)}

                {isPending && <Repetidor elemento={<CategoriaProdutoSkeleton />} vezes={7} />}

                {data?.data && data.data.content.length < 1 &&
                <span className="text-stone-600">Nenhuma categoria cadastrada</span>}
            </div>
        </div>
    )
}

type CategoriaProdutoListViewFilterProps = {
    data?: PagedResponse<CategoriaProdutoResponse>;
}

function CategoriaProdutoListViewFilter({ data }: CategoriaProdutoListViewFilterProps) {

    const [displayValue, _, updateValue] = useParamsDebounce("nome", 500);

    return (
        <div className="max-w-lg">
            <InputGroup>
                <InputGroupInput value={displayValue} onChange={(e) => updateValue(e.target.value)} placeholder="Pesquisar categoria" />
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

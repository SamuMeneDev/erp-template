import type { PagedResponse } from "@erp-template/types"
import { Button, Field, FieldLabel, NativeSelect, NativeSelectOption, Pagination as Pag, PaginationContent, PaginationItem, PaginationLink } from "../ui"
import { useSearchParams } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";


/**
 * Função que renderiza os botões de navegação das páginas, de acordo com o total de páginas.
 * 
 * @param totalPages Número do total de páginas que a listagem possui.
 * @returns Retorna uma lista de elementos JSX, representando os botões de navegação das páginas.
 */
function renderPaginas(resp?: PagedResponse<any>) {

    const [_, setParams] = useSearchParams();

    const paginas: React.JSX.Element[] = [];
    const totalPages = resp?.page.totalPages ?? 0;
    const currentPage = resp?.page.number ?? 0;

    for(let i=1; i<= totalPages; i++) {
        const pageIndex = i-1;
        paginas.push(
            <PaginationItem key={i}>
                <PaginationLink
                isActive={currentPage === pageIndex}
                onClick={()=>{
                    if(currentPage !== pageIndex) {
                        setParams((prev) => {
                            const newParams = new URLSearchParams(prev);
                            newParams.set("page", pageIndex.toString());
                            return newParams;
                        });
                    }
                }}>
                    {i}
                </PaginationLink>
            </PaginationItem>
        );
    }
    return paginas
}


type PaginationProps = {
    data?: PagedResponse<any>
}

/**
 * Componente que renderiza um indicador para listas paginadas, onde é possivel
 * navegar entre os índices das páginas.
 */
export function Pagination({ data }: PaginationProps) {

    function handleParam(key: string,value: string) {
        setParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set(key, value);
            return newParams;
        });
    }

    const [_, setParams] = useSearchParams();

    const pageSizes = [2, 5, 10, 25, 50, 100];

    return (
        <div className="flex flex-col gap-4 max-w-lg">
            <Pag className="flex justify-start w-fit">
                <PaginationContent>
                    <PaginationItem>
                        <Button
                        variant="ghost"
                        disabled={data?.page.number == 0}
                        onClick={()=>handleParam("page", ((data?.page.number ?? 0) - 1).toString())}>
                            <ChevronLeft />
                            <span>Anterior</span>
                        </Button>
                    </PaginationItem>
                    {renderPaginas(data as PagedResponse<any>)}
                    <PaginationItem>
                        <Button
                        variant="ghost"
                        disabled={data?.page && (data.page.number === data.page.totalPages - 1) || (data?.page.totalPages === 0)}
                        onClick={()=>handleParam("page", ((data?.page.number ?? 0) + 1).toString())}>
                            <span>Proximo</span>
                            <ChevronRight />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pag>
            <Field orientation="horizontal" className="grid grid-cols-5 w-md">
                <FieldLabel className="col-span-2">Registros por página</FieldLabel>
                <NativeSelect className="col-span-3" defaultValue="10" onChange={(e)=>handleParam("size", e.target.value)}>
                    {pageSizes.map((size) => (
                        <NativeSelectOption
                        key={size}
                        onClick={()=>handleParam("size", size.toString())}
                        value={size.toString()}>
                            {size}
                        </NativeSelectOption>
                    ))}
                </NativeSelect>
            </Field>
        </div>
    )
}
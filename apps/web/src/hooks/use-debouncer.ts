import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

/**
 * Hook que retorna um valor debounced, ou seja, um valor que só é atualizado após um determinado tempo de espera.
 * 
 * @param initialValue Valor inicial que será usado.
 * @param delay Tempo de espera em milissegundos.
 * @returns Um array com três elementos: o valor debounced, o valor atual e uma função para atualizar o valor atual.
 * `return [displayValue, debouncedValue, updateValue]`
 */
export function useDebouncer<T>(initialValue: T, delay: number) {
 
    /**
     * Estado que armazena o valor atual do input, que é atualizado imediatamente quando o usuário digita.
     */
    const [displayValue, setDisplayValue] = useState<T>(initialValue);
    
    /**
     * Estado que armazena o valor debounced, que é atualizado apenas após o tempo de espera definido pelo delay.
     */
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

    /**
     * Estado que armazena o timeout que será usado para atualizar
     * o valor debounced após o tempo de espera definido pelo delay.
     */
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isDebouncing, setDebouncing] = useState(false);

    /**
     * Função que atualiza o valor atual do input e inicia o timeout para atualizar
     *  o valor debounced após o tempo de espera definido pelo delay.
     * 
     * @param newValue Novo valor que será atualizado no input e no valor debounced.
     */
    function updateValue(newValue: T) {
        setDisplayValue(newValue);
        setDebouncing(true);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setDebouncedValue(newValue);
            setDebouncing(false);
        }, delay);
    }
    
    useEffect(()=> {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, []);

    return [displayValue, debouncedValue, updateValue, isDebouncing] as const;
}


/**
 * Hook que retorna um valor debounced de um parâmetro da URL, ou seja, um valor que só é atualizado
 *  após um determinado tempo de espera. 
 * 
 * @param key Chave do parâmetro da URL que será usado para buscar o valor debounced.
 * @param delay tempo de espera em milissegundos.
 * @returns Um array com três elementos: o valor debounced,
 *  o valor atual e uma função para atualizar o valor atual.
 */
export function useParamsDebounce(key: string, delay: number) {

    const [searchParams, setSearchParams] = useSearchParams();

    const initialValue = searchParams.get(key) || "";

    const [displayValue, debouncedValue, updateValue] = useDebouncer<string>(initialValue, delay);


    useEffect(() => {

        const newParams = new URLSearchParams(window.location.search);

        if(debouncedValue !== (newParams.get(key) || "")) {
            if(debouncedValue) {
                newParams.set(key, debouncedValue);
            } else {
                newParams.delete(key);
            }

            if (newParams.has("page")) {
                newParams.set("page", "1"); 
            }

            setSearchParams(decodeURIComponent(newParams.toString()));
        }
    }, [debouncedValue, key, setSearchParams]);

    return [displayValue, debouncedValue, updateValue] as const;
}
import axios, { AxiosError } from "axios";
import { authStorage } from "./AuthStorage";

/**
 * Cliente HTTP usado por todos os front end (React base) para realizar as requisições ao back-end
 */
export const api = axios.create({
    withCredentials: true
});

export { AxiosError } ;

api.interceptors.request.use(async (config)=>{
    // Busca o token do armazenamento abstrato
  const token = await authStorage.getToken();

  // Se houver um token guardado (caso do Mobile), injeta no cabeçalho
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; 
})

/**
 * @param apiUrl Variavel da URL base da API a ser injetada para ser usada nas requisições.
 * @description Na arquitetura atual do projeto, para cada front-end usar a lógica desse pacote, ele deve
 * em seu main.tsx ou similar, usar essa função para injetar no parâmetro, a rota raiz da api, vinda de sua
 * respectiva variavel na `.env`.
 */
export function initServices(apiUrl: string) {
    api.defaults.baseURL = apiUrl;
}
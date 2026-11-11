/** Interface para implementação de perssistência de tokens
 * Usando o patter Adapter
 */
export interface AuthStorage {
    getToken: () => Promise<string | null> | string | null;
    setToken: (token: string) => Promise<void> | void;
    clearToken: () => Promise<void> | void;
}

let storage: AuthStorage = {
    clearToken:()=>{},
    setToken: ()=> {},
    getToken: ()=>null
}

export const initializeStorage = (implementation: AuthStorage) => {
  storage = implementation;
};

export const authStorage = {
  getToken: () => storage.getToken(),
  setToken: (token: string) => storage.setToken(token),
  clearToken: () => storage.clearToken(),
};
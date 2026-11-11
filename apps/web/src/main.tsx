import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { RootLayout, Login, EsqueciSenha} from '@/app/index';
import { DashboardLayout, Dashboard, Settings } from './app/dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@erp-template/contexts';
import { api, AxiosError, initServices } from '@erp-template/services/api';
import { PublicRoute, PrivateRoute, ExclusiveRoute } from './components/layout';
import { ThemeProvider } from './contexts';
import { CategoriaInsumo, Insumos } from './app/insumos';
import { CategoriaProdutos, Produtos } from './app/produtos';
import { toast, Toaster } from './components/ui';
import { Precificacao } from './app/precificacao';
import { SuporteAdmin, Usuarios } from './app/admin';
import type { SpringBootError } from '@erp-template/types';
import { Venda } from './app/venda';
import { Suporte } from './app/suporte';
import { registerSW } from 'virtual:pwa-register'

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  }
});

// Carregando Rota da api para o sistema.
initServices(import.meta.env.VITE_API_URL);

api.interceptors.response.use(
  async (response) => {
    return response
  },
  (error: AxiosError<SpringBootError>) => {
    if(error.response && error.response.data && error.response.data.error) {
      toast.add({
        title: error.response.data.error || "Ocorreu um erro na operação",
        type: "error",
        priority: "high",
        "timeout": 5000
      });
    }
    return Promise.reject(error);
  }
);

if ('serviceWorker' in navigator) {
  registerSW({ immediate: true })
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient} >
        <ThemeProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                  {/* Rotas públicas */}
                  <Route element={<PublicRoute />}>
                    <Route element={<RootLayout />}>
                      <Route path="login" element={<Login />} />
                      <Route path="esqueci-senha" element={<EsqueciSenha />} />
                    </Route>
                  </Route>

                  {/* Rotas da dashboard e configs. */}
                  <Route path="dashboard" element={<PrivateRoute />}>
                    <Route element={<DashboardLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                  </Route>

                  {/* Rotas insumos */}
                  <Route path='insumos' element={<PrivateRoute />}>
                    <Route element={<DashboardLayout />}>
                      <Route index element={<Insumos />} />
                      <Route path='categorias' element={<CategoriaInsumo />} />
                    </Route>
                  </Route>

                  {/* Rotas produtos */}
                  <Route path='produtos' element={<PrivateRoute/>}>
                    <Route element={<DashboardLayout/>}>
                      <Route index element={<Produtos/>} />
                      <Route path='categorias' element={<CategoriaProdutos />} />
                    </Route>
                  </Route>

                  {/* Rotas precificação */}
                  <Route path='precificacao' element={<PrivateRoute />} >
                    <Route element={<DashboardLayout />}>
                      <Route index element={<Precificacao />} />
                    </Route>
                  </Route>

                  {/* Rotas venda */}
                  <Route path='venda' element={<PrivateRoute />}>
                    <Route element={<DashboardLayout />}>
                      <Route index element={<Venda />} />
                    </Route>
                  </Route>

                  {/* Rotas suporte */}
                  <Route path='suporte' element={<PrivateRoute />}>
                    <Route element={<DashboardLayout />}>
                      <Route index element={<Suporte />} />
                    </Route>
                  </Route>


                  {/* Rotas de Admin */}
                  <Route path='admin' element={<PrivateRoute />}>
                    <Route element={<DashboardLayout />}>
                      <Route element={<ExclusiveRoute exclusive={["ADMIN"]} />} >
                        <Route path='usuarios' element={<Usuarios />} />
                        <Route path='suporte' element={<SuporteAdmin />}/>
                      </Route>
                    </Route>
                  </Route>

                  {/* Redirect */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
                  <Toaster />
            </BrowserRouter>
            
        </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
  </StrictMode>,
)

// Seu App.tsx atualizado

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importe suas páginas e o novo layout
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cadastro from "./pages/Cadastro"; // <-- 1. IMPORTE A PÁGINA DE CADASTRO
import MainLayout from "./Layouts/MainLayouts"; // <-- 2. IMPORTE O NOVO LAYOUT

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 3. ROTAS QUE USAM O LAYOUT PRINCIPAL */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            {/* Se você tiver outras páginas no futuro, como /sobre, coloque-as aqui */}
            {/* <Route path="/sobre" element={<Sobre />} /> */}
          </Route>
          
          {/* 4. ROTA INDEPENDENTE, SEM O LAYOUT PRINCIPAL */}
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rota "pega-tudo" para páginas não encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
// Em src/layouts/MainLayout.tsx

import { Outlet } from "react-router-dom";
// Você provavelmente tem componentes de Cabeçalho e Rodapé em algum lugar.
// Importe-os aqui. Se eles estiverem dentro da sua página Index, você precisará movê-los
// para seus próprios arquivos para que possam ser reutilizados.
// Ex: import { Header } from "@/components/Header";
// Ex: import { Footer } from "@/components/Footer";

const MainLayout = () => {
  return (
    <>
      {/* <Header /> */} {/* SEU COMPONENTE DE CABEÇALHO IRIA AQUI */}

      <main>
        {/* O Outlet renderiza a página da rota atual (ex: a página Index) */}
        <Outlet />
      </main>

      {/* <Footer /> */} {/* SEU COMPONENTE DE RODAPÉ IRIA AQUI */}
    </>
  );
};

export default MainLayout;
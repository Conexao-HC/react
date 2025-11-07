import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header"; 
import Footer from "./components/Footer/Footer";
import MenuLateral from "./components/MenuLateral/MenuLateral"; 
import { useState } from "react";

export default function App(){
    
    let nomeUsuarioLogado = "Usuário"; 
    const usuarioJson = localStorage.getItem('usuarioLogado'); 

    if (usuarioJson) {
        try {
            const usuario = JSON.parse(usuarioJson);
            nomeUsuarioLogado = usuario.nome || "Usuário"; 
        } catch (e) {
            console.error("Erro ao fazer parse do usuário no localStorage:", e);
        }
    }
    
    const [menuAberto, setMenuAberto] = useState(false);
    
    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };


    return(
        <div className="min-h-screen flex flex-col"> 

            <Header onToggleMenu={toggleMenu} menuAberto={menuAberto} /> 

            <main className="flex-grow">
                <Outlet/>
            </main>

            <Footer/>

            {menuAberto && (
                <>
                    <div 
                        className="fixed inset-0 bg-transparent bg-opacity-50 z-40" 
                        onClick={() => setMenuAberto(false)}
                    ></div>
                    
                    <MenuLateral 
                        onClose={() => setMenuAberto(false)} 
                    />
                </>
            )}

        </div>
    );
}
// src/components/Header/Header.tsx

import { Link } from 'react-router-dom';

// 1. Define o tipo das Props que o App.tsx deve passar
type HeaderProps = {
    onToggleMenu: () => void; // Função para abrir o menu lateral/modal
    menuAberto: boolean;      // Para acessibilidade (aria-expanded)
};

// 2. O componente recebe as props via destructuring
export default function Header({ onToggleMenu, menuAberto }: HeaderProps) {
    
    return (
        <header className="bg-[#acf0ff] shadow-md sticky top-0 z-20 w-full"> 
            
            <div className="flex items-center justify-between px-4 py-3 w-full mx-auto">
                
                {/* Logo Link para Home */}
                <Link to="/home">
                    <img 
                        className="logohc w-28 h-auto" 
                        src="/Challenge front-end/assets/img/logohc.png" 
                        alt="Logo HC" 
                    />
                </Link>

                {/* Navegação Desktop */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/faq" className="text-black text-lg font-medium hover:text-blue-700 transition duration-150">
                        FAQ
                    </Link>
                    <Link to="/sobre" className="text-black text-lg font-medium hover:text-blue-700 transition duration-150">
                        Sobre
                    </Link>
                </nav>

                {/* 3. Botão de 3 Pontos (MENU) - Chamará a função recebida via Props */}
                <button 
                    onClick={onToggleMenu} 
                    className="md:hidden p-2 rounded-full hover:bg-blue-100 transition duration-150"
                    aria-expanded={menuAberto} 
                    aria-controls="mobile-menu"
                >
                    <img 
                        src="/Challenge front-end/assets/img/tres-pontos.png" 
                        alt="Menu" 
                        className="w-8 h-8" 
                    />
                </button>

                {/* Botão de Usuário Desktop (mantido aqui, pode ser o mesmo toggle) */}
                <button
                    onClick={onToggleMenu}
                    className="hidden md:block p-2 rounded-full hover:bg-blue-100 transition duration-150"
                >
                    <img 
                        src="/Challenge front-end/assets/img/tres-pontos.png" 
                        alt="Menu" 
                        className="w-6 h-6" 
                    />
                </button>
            </div>
            
            {/* O Menu Suspenso Mobile FOI MOVIDO para o App.tsx (ou MenuLateral.tsx) */}

        </header>
    );
}
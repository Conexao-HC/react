import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <header className="bg-[#acf0ff] shadow-md sticky top-0 z-20"> 
            
            <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
                
                <Link to="/">
                    <img 
                        className="logohc w-28 h-auto" 
                        src="/Challenge front-end/assets/img/logohc.png" 
                        alt="Logo HC" 
                    />
                </Link>

                <nav className="hidden md:flex space-x-6">
                    <Link 
                        to="/faq" 
                        className="text-black text-lg font-medium hover:text-blue-700 transition duration-150"
                    >
                        FAQ
                    </Link>
                    <Link 
                        to="/sobre" 
                        className="text-black text-lg font-medium hover:text-blue-700 transition duration-150"
                    >
                        Sobre
                    </Link>
                </nav>

                <button 
                    onClick={toggleMenu} 
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

                <button
                    onClick={() => console.log('Abrir Menu de Usuário')}
                    className="hidden md:block p-2 rounded-full hover:bg-blue-100 transition duration-150"
                >
                     <img 
                        src="/Challenge front-end/assets/img/tres-pontos.png" 
                        alt="Menu" 
                        className="w-6 h-6" 
                    />
                </button>
            </div>


            {menuAberto && (
                <nav 
                    id="mobile-menu"
                    className="absolute top-full left-0 w-full bg-[#acf0ff] shadow-lg md:hidden border-t border-gray-300 transition-all duration-300"
                >
                    <Link 
                        to="/faq" 
                        className="block px-4 py-3 text-black text-base font-medium hover:bg-blue-200"
                        onClick={toggleMenu} 
                    >
                        FAQ
                    </Link>
                    <Link 
                        to="/sobre" 
                        className="block px-4 py-3 text-black text-base font-medium hover:bg-blue-200"
                        onClick={toggleMenu} 
                    >
                        Sobre
                    </Link>
                </nav>
            )}
        </header>
    );
}
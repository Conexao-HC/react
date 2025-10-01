import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from '../../data/DataMenu';



type MenuLateralProps = {
    nomeUsuario: string;
    onClose: () => void;
};

export default function MenuLateral({ nomeUsuario, onClose }: MenuLateralProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('usuarioCadastrado');
        onClose(); 
        navigate('/'); 
    };

    return (
        
        <div className="w-60 h-full bg-white shadow-2xl p-4 flex flex-col fixed top-0 right-0 z-50">
            
           
            <button 
                onClick={onClose} 
                className="bg-[#4c88cc] text-white text-sm font-medium rounded-md w-14 py-1 self-start mb-4 hover:bg-blue-700 transition"
            >
                Voltar
            </button>
            
            
            <div className="bg-[#d9d9d9] rounded-md p-2 flex items-center mb-4">
                <img 
                    className="w-8 h-8 rounded-full object-cover mr-2" 
                    src="/Challenge front-end/assets/img/perfil.png" 
                    alt="Foto de Perfil"
                />
                <p className="text-sm font-medium text-black truncate">{nomeUsuario}</p>
            </div>

            
            <nav className="flex flex-col space-y-3 overflow-y-auto flex-grow">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.route}
                        onClick={onClose} 
                        className="bg-[#d9d9d9] rounded-md p-2 text-sm font-normal text-black text-center shadow-md hover:bg-gray-400 transition"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            
            <button 
                onClick={handleLogout}
                className="bg-[#4c88cc] text-white text-base font-medium rounded-md py-2 mt-4 hover:bg-blue-700 transition"
            >
                SAIR
            </button>
        </div>
    );
}
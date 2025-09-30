import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import type { LoginForm } from '../../types/login';


export default function Login() {
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<LoginForm>();

    const navigate = useNavigate();

    const onSubmit = (data: LoginForm) => {
        
        
        const storedUser = localStorage.getItem('usuarioCadastrado');

        if (!storedUser) {
            alert("Nenhum usuário cadastrado. Crie uma conta primeiro.");
            return;
        }
        const user = JSON.parse(storedUser);
        if (data.cpf === user.cpf && data.senha === user.senha) {
            alert("Login efetuado com sucesso!");
            navigate('/home'); 
        } else {
            
            alert("CPF ou Senha incorretos. Tente Novamente.");
        }
    };

    
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white py-10">
            
            <header className="cabecalho w-full h-24 absolute top-0" 
                    style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(242, 254, 255, 1) 25%, rgba(22, 185, 204, 1) 83.65%)' }}>
                <Link to="/">
                    <img className="logohc w-32 h-auto absolute left-4 top-3" 
                         src="/Challenge front-end/assets/img/logohc.png" 
                         alt="Logo HC" />
                </Link>
            </header>

            <div className="w-full max-w-sm mx-auto mt-44"> 
                
                <div className="bg-gray-300 rounded-lg p-6 shadow-md text-center mb-10">
                    <h1 className="text-2xl font-bold text-black">Fazer login</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div>
                        <label htmlFor="cpf" className="block text-sm font-bold text-gray-700">Informe seu CPF</label>
                        <input
                            id="cpf"
                            type="text"
                            placeholder="000.000.000-00"
                            className={`w-full p-4 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.cpf ? 'border-red-500' : 'border-gray-800'}`}
                            {...register("cpf", { 
                                required: "O CPF é obrigatório.",
                                minLength: { value: 11, message: "O CPF deve ter 11 dígitos." }
                            })}
                        />
                        {errors.cpf && <small className="text-red-500 block mt-1">{errors.cpf.message}</small>}
                    </div>
                    
                    <div>
                        <label htmlFor="senha" className="block text-sm font-bold text-gray-700">Digite sua senha</label>
                        <input
                            id="senha"
                            type="password"
                            placeholder="Sua senha"
                            className={`w-full p-4 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.senha ? 'border-red-500' : 'border-gray-800'}`}
                            {...register("senha", { 
                                required: "A senha é obrigatória.",
                                minLength: { value: 6, message: "A senha deve ter no mínimo 6 caracteres." }
                            })}
                        />
                        {errors.senha && <small className="text-red-500 block mt-1">{errors.senha.message}</small>}
                    </div>

                    <div className="flex justify-end">
                        <Link to="/esqueci-senha" className="text-sm font-bold text-[#156b8b] hover:text-blue-700">
                            Esqueci minha senha
                        </Link>
                    </div>

                    <button
                        type="submit" 
                        
                        className="w-full py-3 px-4 rounded-lg shadow-md text-xl font-bold text-black bg-[#5fbbc0] hover:bg-teal-500 transition duration-150 mt-4"
                    >
                        Entrar
                    </button>
                    
                    <Link to="/cadastro" 
                          className="block text-center w-full py-3 px-4 rounded-lg shadow-md text-xl font-bold text-black bg-[#5fbbc0] hover:bg-teal-500 transition duration-150 mt-4">
                        Criar um cadastro
                    </Link>
                </form>
            </div>
        </div>
    );
}
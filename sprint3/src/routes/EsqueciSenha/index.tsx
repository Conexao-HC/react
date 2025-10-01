import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import type { EsqueciSenhaForm } from '../../types/esquecisenha';


export default function EsqueciSenha() {
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        watch
    } = useForm<EsqueciSenhaForm>();

    const navigate = useNavigate();

    const emailSeguido= watch("email", "");
    const novaSenhaSeguida = watch("novaSenha", "");

    const onSubmit = (data: EsqueciSenhaForm) => {
        alert(`Redefinição de senha solicitada para o e-mail: ${data.email}. Redirecionando para o Login.`);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white pb-20">
            
            <header className="w-full h-24 absolute top-0 z-10" 
                    style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(242, 254, 255, 1) 25%, rgba(22, 185, 204, 1) 83.65%)' }}>
                <Link to="/login" className="absolute right-4 top-6 p-2">
                    <img src="/Challenge front-end/assets/img/seta-esquerda.png" alt="Voltar para Login" className="w-8 h-8" />
                </Link>
            </header>
            
            <div className="w-full max-w-sm mx-auto mt-44 px-4"> 
                
                <div className="bg-gray-300 rounded-lg p-3 shadow-md text-center mb-6">
                    <h1 className="text-2xl font-bold text-black">Esqueci minha senha</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <h2 className="text-xl font-bold text-blue-400 pt-2 border-t border-gray-300">Confirmação de E-mail</h2>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700">Novo E-mail</label>
                        <input type="email" id="email" placeholder="Trocar e-mail"
                            className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                            {...register("email", { required: "O e-mail é obrigatório.", pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido." } })}
                        />
                        {errors.email && <small className="text-red-500 block mt-1">{errors.email.message}</small>}
                    </div>
                    
                    <div>
                        <label htmlFor="confirmaEmail" className="block text-sm font-bold text-gray-700">Confirme o E-mail</label>
                        <input type="email" id="confirmaEmail" placeholder="Confirme o e-mail"
                            className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.confirmarEmail ? 'border-red-500' : 'border-gray-700'}`}
                            {...register("confirmarEmail", { 
                                required: "A confirmação é obrigatória.",
                                validate: value => value === emailSeguido || "Os e-mails não conferem."
                            })}
                        />
                        {errors.confirmarEmail && <small className="text-red-500 block mt-1">{errors.confirmarEmail.message}</small>}
                    </div>

                    <h2 className="text-xl font-bold text-blue-400 pt-2 border-t border-gray-300">Redefinir Senha</h2>
                    
                    <div>
                        <label htmlFor="novaSenha" className="block text-sm font-bold text-gray-700">Nova Senha</label>
                        <input type="password" id="novaSenha" placeholder="Redefinir senha"
                            className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.novaSenha ? 'border-red-500' : 'border-gray-700'}`}
                            {...register("novaSenha", { required: "A nova senha é obrigatória.", minLength: { value: 6, message: "Mínimo 6 caracteres." } })}
                        />
                        {errors.novaSenha && <small className="text-red-500 block mt-1">{errors.novaSenha.message}</small>}
                    </div>
                    
                    <div>
                        <label htmlFor="confirmaNovaSenha" className="block text-sm font-bold text-gray-700">Confirme a Nova Senha</label>
                        <input type="password" id="confirmaNovaSenha" placeholder="Confirme a nova senha"
                            className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.confirmarNovaSenha ? 'border-red-500' : 'border-gray-700'}`}
                            {...register("confirmarNovaSenha", { 
                                required: "A confirmação é obrigatória.",
                                validate: value => value === novaSenhaSeguida || "As senhas não conferem."
                            })}
                        />
                        {errors.confirmarNovaSenha && <small className="text-red-500 block mt-1">{errors.confirmarNovaSenha.message}</small>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-8"
                    >
                        Finalizar Redefinição
                    </button>
                </form>
            </div>
            
        </div>
    );
}
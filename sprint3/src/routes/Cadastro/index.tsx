import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import type { CadastroForm } from '../../types/cadastro';


export default function Cadastro() {
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        watch
    } = useForm<CadastroForm>();

    const navigate = useNavigate();
    const senhaAssistida = watch("senha", "");

    const onSubmit = (data: CadastroForm) => {
        
        const loginData = {
            cpf: data.cpf,
            senha: data.senha,
        };
        
        try {
            localStorage.setItem('usuarioCadastrado', JSON.stringify(loginData)); 
            
            alert(`Cadastro de ${data.nome} realizado com sucesso! Redirecionando para o Login.`);
            navigate('/');
        } catch {
            alert("Erro ao salvar dados. Tente novamente.");
        }
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white pb-20">
            
            <header className="w-full h-24 absolute top-0 z-10" 
                    style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(242, 254, 255, 1) 25%, rgba(22, 185, 204, 1) 83.65%)' }}>
                <Link to="/">
                    <img className="logohc w-32 h-auto absolute left-4 top-3" 
                         src="/Challenge front-end/assets/img/logohc.png" 
                         alt="Logo HC" />
                </Link>
                <Link to="/login" className="absolute right-4 top-6 p-2">
                    <img src="/Challenge front-end/assets/img/seta-esquerda.png" alt="Voltar para Login" className="w-8 h-8 rotate-180" />
                </Link>
            </header>
            
            <div className="w-full max-w-md mx-auto mt-44 px-4"> 
                
                <div className="bg-gray-300 rounded-lg p-3 shadow-md text-center mb-6">
                    <h1 className="text-2xl font-bold text-black">Fazer um cadastro</h1>
                    <p className="text-sm font-bold text-black mt-2 underline">Coloque as seguintes informações</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="nome" className="block text-sm font-bold text-gray-700">Nome</label>
                            <input type="text" id="nome" placeholder="Nome"
                                className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.nome ? 'border-red-500' : 'border-gray-700'}`}
                                {...register("nome", { required: "O nome é obrigatório." })}
                            />
                            {errors.nome && <small className="text-red-500 block mt-1">{errors.nome.message}</small>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700">Email</label>
                            <input type="email" id="email" placeholder="Digite seu email"
                                className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                                {...register("email", { required: "O email é obrigatório.", pattern: { value: /^\S+@\S+$/i, message: "Email inválido." } })}
                            />
                            {errors.email && <small className="text-red-500 block mt-1">{errors.email.message}</small>}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="senha" className="block text-sm font-bold text-gray-700">Crie uma senha</label>
                            <input type="password" id="senha" placeholder="Crie uma senha"
                                className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.senha ? 'border-red-500' : 'border-gray-700'}`}
                                {...register("senha", { required: "A senha é obrigatória.", minLength: { value: 6, message: "Mínimo 6 caracteres." } })}
                            />
                            {errors.senha && <small className="text-red-500 block mt-1">{errors.senha.message}</small>}
                        </div>
                        <div>
                            <label htmlFor="confirmaSenha" className="block text-sm font-bold text-gray-700">Confirme sua senha</label>
                            <input type="password" id="confirmaSenha" placeholder="Confirme sua senha"
                                className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.confirmarSenha ? 'border-red-500' : 'border-gray-700'}`}
                                {...register("confirmarSenha", { 
                                    required: "A confirmação é obrigatória.",
                                    validate: value => value === senhaAssistida || "As senhas não conferem."
                                })}
                            />
                            {errors.confirmarSenha && <small className="text-red-500 block mt-1">{errors.confirmarSenha.message}</small>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dataNascimento" className="block text-sm font-bold text-gray-700">Data de nascimento</label>
                            <input type="date" id="dataNascimento" placeholder="DD/MM/AAAA"
                                className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.dataNascimento ? 'border-red-500' : 'border-gray-700'}`}
                                {...register("dataNascimento", { required: "A data é obrigatória." })}
                            />
                            {errors.dataNascimento && <small className="text-red-500 block mt-1">{errors.dataNascimento.message}</small>}
                        </div>
                        <div>
                            <label htmlFor="telefone" className="block text-sm font-bold text-gray-700">Telefone</label>
                            <input type="tel" id="telefone" placeholder="(00) 00000-0000"
                                className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.telefone ? 'border-red-500' : 'border-gray-700'}`}
                                {...register("telefone", { required: "O telefone é obrigatório.", minLength: { value: 10, message: "Telefone incompleto." } })}
                            />
                            {errors.telefone && <small className="text-red-500 block mt-1">{errors.telefone.message}</small>}
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="cpf" className="block text-sm font-bold text-gray-700">CPF</label>
                        <input type="text" id="cpf" placeholder="000.000.000-00"
                            className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.cpf ? 'border-red-500' : 'border-gray-700'}`}
                            {...register("cpf", { required: "O CPF é obrigatório.", minLength: { value: 11, message: "O CPF deve ter 11 dígitos." } })}
                        />
                        {errors.cpf && <small className="text-red-500 block mt-1">{errors.cpf.message}</small>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-8"
                    >
                        Finalizar Cadastro
                    </button>
                </form>
            </div>
            
        </div>
    );
}
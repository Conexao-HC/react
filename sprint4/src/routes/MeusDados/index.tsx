
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import type { CadastroForm } from '../../types/cadastro';
import fotoPessoa from '../../assets/img/pessoa.png'
import fotoEmail from '../../assets/img/e-mail.png'
import fotoCalendario from '../../assets/img/calendar.png'
import fotoTelefone from '../../assets/img/silhueta-de-alca-de-telefone.png'
import fotoEscreve from '../../assets/img/escreva.png'
import fotoCadeado from '../../assets/img/cadeado.png'


const COR_FUNDO = '#acf0ff'; 
const COR_BORDA = '#169da6'; 

export default function MeusDados() {
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm<CadastroForm>();

    const navigate = useNavigate();

    useEffect(() => {
        const usuarioJson = localStorage.getItem('usuarioCadastrado');

        if (usuarioJson) {
            try {
                const usuario = JSON.parse(usuarioJson);
                
                reset({
                    nome: usuario.nome || '',
                    email: usuario.email || '',
                    dataNascimento: usuario.dataNascimento || '',
                    telefone: usuario.telefone || '',
                    cpf: usuario.cpf || '',
                });
            } catch (e) {
                console.error("Erro ao carregar dados do perfil:", e);
                alert("Não foi possível carregar seus dados. Por favor, faça login novamente.");
            }
        }
    }, [reset]); 

    const onSubmit = (data: CadastroForm) => {
        
        const dadosCompletosJson = localStorage.getItem('usuarioCadastrado');
        let dadosCompletos = {};

        if (dadosCompletosJson) {
            dadosCompletos = JSON.parse(dadosCompletosJson);
        }

        const dadosAtualizados = {
            ...dadosCompletos,
            ...data,
        };

        localStorage.setItem('usuarioCadastrado', JSON.stringify(dadosAtualizados));

        alert(`Perfil atualizado com sucesso para ${data.nome}!`);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-white pb-20 pt-10">
            
            <div className="w-full max-w-md mx-auto px-4">
                <h1 
                    className="text-3xl font-medium text-center text-black mb-8 p-6 rounded-lg shadow-md border-2"
                    style={{ backgroundColor: COR_FUNDO, borderColor: COR_BORDA }}
                >
                    MEUS DADOS
                </h1>
                <p className="text-sm font-bold text-center text-black mt-2 mb-6">
                    Essa é a área de DADOS DO PACIENTE, aqui você poderá consultar os dados da sua consulta ou troca-los se precisar.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} 
                  className="w-full max-w-md mx-auto px-4 space-y-4 p-6 rounded-lg shadow-xl border-2"
                  style={{ backgroundColor: COR_FUNDO, borderColor: COR_BORDA }}
            >
                
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-bold text-gray-700 flex items-center">
                            <img src={fotoPessoa} alt="Pessoa" className="w-4 h-4 mr-2" />Nome do Paciente
                        </label>
                        <input type="text" id="nome"
                            className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.nome ? 'border-red-500' : 'border-gray-700'}`}
                            {...register("nome", { required: "O nome é obrigatório." })}
                        />
                        {errors.nome && <small className="text-red-500 block mt-1">{errors.nome.message}</small>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 flex items-center">
                            <img src={fotoEmail} alt="Email" className="w-4 h-4 mr-2" />Email do Paciente
                        </label>
                        <input type="email" id="email"
                            className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
                            {...register("email", { required: "O email é obrigatório." })}
                        />
                        {errors.email && <small className="text-red-500 block mt-1">{errors.email.message}</small>}
                    </div>
                </div>
                
                <div className="pt-2 border-t border-gray-300">
                    <label className="block text-sm font-bold text-gray-700 flex items-center">
                         <img src={fotoCadeado} alt="Cadeado" className="w-4 h-4 mr-2" />Senha do Paciente
                    </label>
                    <Link to="/esquecisenha" className="text-blue-600 hover:underline text-sm font-medium mt-1 block">
                        Redefinir Senha
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dataNascimento" className="block text-sm font-bold text-gray-700 flex items-center">
                            <img src={fotoCalendario} alt="Calendário" className="w-4 h-4 mr-2" />Data de Nascimento
                        </label>
                        <input type="date" id="dataNascimento"
                            className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.dataNascimento ? 'border-red-500' : 'border-gray-700'}`}
                            {...register("dataNascimento", { required: "A data é obrigatória." })}
                        />
                        {errors.dataNascimento && <small className="text-red-500 block mt-1">{errors.dataNascimento.message}</small>}
                    </div>
                    <div>
                        <label htmlFor="telefone" className="block text-sm font-bold text-gray-700 flex items-center">
                            <img src={fotoTelefone} alt="Telefone" className="w-4 h-4 mr-2" />Telefone
                        </label>
                        <input type="tel" id="telefone"
                            className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.telefone ? 'border-red-500' : 'border-gray-700'}`}
                            {...register("telefone", { required: "O telefone é obrigatório.", minLength: { value: 10, message: "Telefone incompleto." } })}
                        />
                        {errors.telefone && <small className="text-red-500 block mt-1">{errors.telefone.message}</small>}
                    </div>
                </div>

                <div>
                    <label htmlFor="cpf" className="block text-sm font-bold text-gray-700 flex items-center">
                         <img src={fotoEscreve} alt="Lápis" className="w-4 h-4 mr-2" />CPF do Paciente
                    </label>
                    <input type="text" id="cpf"
                        className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg focus:ring-blue-500 focus:border-blue-500 ${errors.cpf ? 'border-red-500' : 'border-gray-700'}`}
                        {...register("cpf", { required: "O CPF é obrigatório.", minLength: { value: 11, message: "O CPF deve ter 11 dígitos." } })}
                    />
                    {errors.cpf && <small className="text-red-500 block mt-1">{errors.cpf.message}</small>}
                </div>


                <button
                    type="submit"
                    className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-8"
                >
                    Finalizar Edição
                </button>
            </form>
            
        </div>
    );
}
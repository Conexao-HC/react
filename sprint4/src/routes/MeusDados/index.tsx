import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import type { CadastroForm } from '../../types/cadastro';
import fotoPessoa from '../../assets/img/pessoa.png';
import fotoEmail from '../../assets/img/e-mail.png';
import fotoCalendario from '../../assets/img/calendar.png';
import fotoTelefone from '../../assets/img/silhueta-de-alca-de-telefone.png';
import fotoEscreve from '../../assets/img/escreva.png';
import fotoCadeado from '../../assets/img/cadeado.png';

const COR_FUNDO = '#acf0ff'; 
const COR_BORDA = '#169da6'; 
const API_URL = "https://sprint4-quarkus.onrender.com";

// Precisamos do tipo Paciente completo (com ID) para pegar o 'idPaciente'
type Paciente = CadastroForm & {
    idPaciente: number;
    // senha e confirmarSenha não vêm do localStorage
};

export default function MeusDados() {
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm<CadastroForm>();

    const navigate = useNavigate();
    
    // Armazena o ID do paciente para o PUT e DELETE
    const [pacienteId, setPacienteId] = useState<number | null>(null);

    useEffect(() => {
        const usuarioJson = localStorage.getItem('usuarioLogado');

        if (usuarioJson) {
            try {
                const usuario: Paciente = JSON.parse(usuarioJson);
                
                // Salva o ID do paciente
                setPacienteId(usuario.idPaciente); 
                
                // Carrega todos os dados no formulário, incluindo o endereço
                reset(usuario); 

            } catch (e) {
                console.error("Erro ao carregar dados do perfil:", e);
                alert("Não foi possível carregar seus dados. Por favor, faça login novamente.");
                navigate('/login'); // Envia para o login se os dados estiverem corrompidos
            }
        } else {
            alert("Você não está logado.");
            navigate('/login'); // Envia para o login se não houver usuário
        }
    }, [reset, navigate]); 

    // MODIFICADO: Função onSubmit agora faz PUT
    const onSubmit = async (data: CadastroForm) => {
        
        if (!pacienteId) {
            alert("Erro: ID do paciente não encontrado. Faça login novamente.");
            return;
        }

        // Remove campos que a API não espera no PUT (como confirmarSenha)
        const { confirmarSenha, ...pacienteData } = data;
        
        // A API espera o ID do paciente no corpo do JSON? 
        // Vamos assumir que sim, mas também enviamos na URL.
        const payload = {
            ...pacienteData,
            idPaciente: pacienteId,
            // Garante que o número do endereço seja um número
            endereco: {
                ...pacienteData.endereco,
                numero: Number(pacienteData.endereco.numero)
            }
        };

        try {
            const response = await fetch(`${API_URL}/paciente/${pacienteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Falha ao atualizar dados.");
            }

            // Atualiza o localStorage com os novos dados
            localStorage.setItem('usuarioLogado', JSON.stringify(payload));

            alert(`Perfil atualizado com sucesso para ${payload.nome}!`);
            navigate('/home'); // Volta para a home

        } catch (error) {
            console.error("Erro ao atualizar:", error);
            let msg = (error instanceof Error) ? error.message : "Tente novamente.";
            alert(`Falha ao atualizar: ${msg}`);
        }
    };

    // ADICIONADO: Função DELETE
    const handleDeleteAccount = async () => {
        if (!pacienteId) {
            alert("Erro: ID do paciente não encontrado.");
            return;
        }

        if (!window.confirm("ATENÇÃO! Você tem certeza que deseja excluir sua conta? Esta ação é irreversível.")) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/paciente/${pacienteId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error("Falha ao excluir conta.");
            }

            alert("Conta excluída com sucesso.");
            localStorage.removeItem('usuarioLogado'); // Limpa o localStorage
            navigate('/login'); // Envia para o login

        } catch (error) {
            console.error("Erro ao excluir:", error);
            let msg = (error instanceof Error) ? error.message : "Tente novamente.";
            alert(`Erro ao excluir conta: ${msg}`);
        }
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
                
                {/* ... Campos Nome, Email ... */}
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
                
                {/* ... Campo Senha ... */}
                <div className="pt-2 border-t border-gray-300">
                    <label className="block text-sm font-bold text-gray-700 flex items-center">
                       <img src={fotoCadeado} alt="Cadeado" className="w-4 h-4 mr-2" />Senha do Paciente
                    </label>
                    <Link to="/esquecisenha" className="text-blue-600 hover:underline text-sm font-medium mt-1 block">
                        Redefinir Senha (Não altera a senha salva, apenas redireciona)
                    </Link>
                </div>
                
                {/* ... Campos DataNascimento, Telefone, CPF ... */}
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
                        className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg bg-gray-200 ${errors.cpf ? 'border-red-500' : 'border-gray-700'}`}
                        {...register("cpf")}
                        readOnly // CPF não deve ser editável
                    />
                </div>

                {/* ADICIONADO: Seção de Endereço */}
                <div className="bg-gray-200 rounded-lg p-3 shadow-inner mt-6">
                    <h2 className="text-xl font-bold text-black mb-4">Endereço</h2>
                    <div className="space-y-4">
                        
                        <div>
                            <label htmlFor="logradouro" className="block text-sm font-bold text-gray-700">Logradouro</label>
                            <input type="text" id="logradouro"
                                className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg ${errors.endereco?.logradouro ? 'border-red-500' : 'border-gray-700'}`}
                                {...register("endereco.logradouro", { required: "O logradouro é obrigatório." })}
                            />
                            {errors.endereco?.logradouro && <small className="text-red-500 block mt-1">{errors.endereco.logradouro.message}</small>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="numero" className="block text-sm font-bold text-gray-700">Número</label>
                                <input type="number" id="numero"
                                    className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg ${errors.endereco?.numero ? 'border-red-500' : 'border-gray-700'}`}
                                    {...register("endereco.numero", { 
                                        required: "O número é obrigatório.",
                                        valueAsNumber: true 
                                    })}
                                />
                                {errors.endereco?.numero && <small className="text-red-500 block mt-1">{errors.endereco.numero.message}</small>}
                            </div>
                            <div>
                                <label htmlFor="bairro" className="block text-sm font-bold text-gray-700">Bairro</label>
                                <input type="text" id="bairro"
                                    className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg ${errors.endereco?.bairro ? 'border-red-500' : 'border-gray-700'}`}
                                    {...register("endereco.bairro", { required: "O bairro é obrigatório." })}
                                />
                                {errors.endereco?.bairro && <small className="text-red-500 block mt-1">{errors.endereco.bairro.message}</small>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="cidade" className="block text-sm font-bold text-gray-700">Cidade</label>
                                <input type="text" id="cidade"
                                    className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg ${errors.endereco?.cidade ? 'border-red-500' : 'border-gray-700'}`}
                                    {...register("endereco.cidade", { required: "A cidade é obrigatória." })}
                                />
                                {errors.endereco?.cidade && <small className="text-red-500 block mt-1">{errors.endereco.cidade.message}</small>}
                            </div>
                            <div>
                                <label htmlFor="estado" className="block text-sm font-bold text-gray-700">Estado</label>
                                <input type="text" id="estado"
                                    className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg ${errors.endereco?.estado ? 'border-red-500' : 'border-gray-700'}`}
                                    {...register("endereco.estado", { required: "O estado é obrigatório." })}
                                />
                                {errors.endereco?.estado && <small className="text-red-500 block mt-1">{errors.endereco.estado.message}</small>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cep" className="block text-sm font-bold text-gray-700">CEP</label>
                            <input type="text" id="cep"
                                className={`w-full p-3 border rounded-lg shadow-sm font-semibold text-lg ${errors.endereco?.cep ? 'border-red-500' : 'border-gray-700'}`}
                                {...register("endereco.cep", { required: "O CEP é obrigatório." })}
                            />
                            {errors.endereco?.cep && <small className="text-red-500 block mt-1">{errors.endereco.cep.message}</small>}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-8"
                >
                    Salvar Alterações
                </button>
            </form>
            
            {/* ADICIONADO: Botão de Excluir Conta */}
            <div className="w-full max-w-md mx-auto px-4 mt-8">
                 <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="w-full py-3 px-4 border border-red-500 rounded-full shadow-lg text-lg font-semibold text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-150"
                >
                    Excluir Minha Conta
                </button>
            </div>
            
        </div>
    );
}
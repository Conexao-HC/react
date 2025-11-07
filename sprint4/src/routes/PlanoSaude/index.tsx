import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { PlanoSaude, PlanoSaudeForm } from '../../types/planosaude'; 

// Constantes da API
const API_URL = "https://sprint4-quarkus.onrender.com";
const COR_FUNDO_BLOCO = '#d9d9d9';
const COR_TAG = '#acf0ff';


export default function Planosaude(){
    
    const [planos, setPlanos] = useState<PlanoSaude[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<PlanoSaude | null>(null);

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm<PlanoSaudeForm>(); 

    // Lógica para pegar o nome do usuário (padrão das suas páginas)
    const usuarioJson = localStorage.getItem('usuarioLogado'); 
    let nomeUsuario = "Paciente";
    if (usuarioJson) {
        try {
            const usuario = JSON.parse(usuarioJson);
            nomeUsuario = usuario.nome ? usuario.nome.split(' ')[0] : "Paciente"; 
        } catch (e) {
            console.error("Erro ao ler dados de usuário:", e);
        }
    }
    
    // Função para buscar (GET) /planosaude
    const fetchPlanosSaude = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/planosaude`);
            if (!response.ok) throw new Error("Falha ao buscar planos de saúde");
            const data = await response.json();
            setPlanos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlanosSaude();
    }, []); 

    // Função onSubmit (POST e PUT)
    const onSubmit = async (data: PlanoSaudeForm) => {
        
        const dataPayload = {
            ...data,
            numeroCarteirinha: Number(data.numeroCarteirinha) // Garante que é número
        }; 

        if (isEditing) {
            // LÓGICA PUT
            try {
                // O endpoint PUT usa o numeroCarteirinha na URL
                const response = await fetch(`${API_URL}/planosaude/${isEditing.numeroCarteirinha}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataPayload)
                });
                if (!response.ok) throw new Error("Erro ao atualizar plano");
                alert(`Plano atualizado com sucesso!`);
                await fetchPlanosSaude(); // Recarrega a lista
            } catch (error) {
                console.error(error);
                let msg = (error instanceof Error) ? error.message : "Tente novamente.";
                alert(`Falha ao atualizar: ${msg}`);
            }
        } else {
            // LÓGICA POST
            try {
                const response = await fetch(`${API_URL}/planosaude`, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataPayload)
                });
                if (!response.ok) throw new Error("Erro ao criar plano");
                alert(`Plano criado com sucesso!`);
                await fetchPlanosSaude(); // Recarrega a lista
            } catch (error) {
                console.error(error);
                let msg = (error instanceof Error) ? error.message : "Tente novamente.";
                alert(`Falha ao criar: ${msg}`);
            }
        }
        reset();
        setIsEditing(null);
    };

    // Função (DELETE)
    const handleDelete = async (numeroCarteirinha: number) => {
        if (!window.confirm("Tem certeza que deseja excluir este plano de saúde?")) return;
        try {
            const response = await fetch(`${API_URL}/planosaude/${numeroCarteirinha}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Falha ao excluir");
            alert("Plano excluído com sucesso!");
            setPlanos(lista => lista.filter(p => p.numeroCarteirinha !== numeroCarteirinha));
        } catch (error) {
            console.error(error);
            let msg = (error instanceof Error) ? error.message : "Tente novamente.";
            alert(`Erro ao excluir: ${msg}`);
        }
    };

    // Funções para modo de edição
    const handleSelectEdit = (plano: PlanoSaude) => {
        setIsEditing(plano);
        reset(plano); 
    };
    
    const handleCancelEdit = () => {
        setIsEditing(null);
        reset(); 
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10">
            
            {/* Cabeçalho */}
            <div 
                className="w-full max-w-lg p-4 rounded-lg shadow-xl mb-8"
                style={{ backgroundColor: COR_FUNDO_BLOCO }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-semibold text-black">Olá, {nomeUsuario}!</h2>
                    <div 
                        className="px-4 py-2 rounded-md shadow-md"
                        style={{ backgroundColor: COR_TAG }}
                    >
                        <span className="text-sm font-semibold text-black">PLANO DE SAÚDE</span>
                    </div>
                </div>
                <p className="text-sm font-semibold text-[#4c88cc] text-center">
                    Gerencie seu plano de saúde.
                </p>
            </div>
            
            {/* Formulário */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-xl">
                
                <h3 className="text-xl font-semibold">
                    {isEditing ? `Editando Plano: ${isEditing.numeroCarteirinha}` : "Adicionar Novo Plano"}
                </h3>

                <div>
                    <label htmlFor="nomePlano" className="block text-sm font-medium text-gray-700">Nome do Plano</label>
                    <input
                        id="nomePlano"
                        type="text"
                        placeholder="Ex: Bradesco"
                        className={`mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500`}
                        {...register("nomePlano", { required: "O nome do plano é obrigatório." })}
                    />
                    {errors.nomePlano && <small className="text-red-500 block mt-1">{errors.nomePlano.message}</small>}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="numeroCarteirinha" className="block text-sm font-medium text-gray-700">Nº da Carteirinha</label>
                        <input
                            id="numeroCarteirinha"
                            type="number"
                            placeholder="Ex: 123456"
                            className={`mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 ${isEditing ? 'bg-gray-100' : ''}`}
                            {...register("numeroCarteirinha", { 
                                required: "O número é obrigatório.",
                                valueAsNumber: true 
                            })}
                            readOnly={!!isEditing} // Trava o campo (chave primária) na edição
                        />
                        {errors.numeroCarteirinha && <small className="text-red-500 block mt-1">{errors.numeroCarteirinha.message}</small>}
                    </div>

                    <div>
                        <label htmlFor="validade" className="block text-sm font-medium text-gray-700">Validade</label>
                        <input
                            id="validade"
                            type="date"
                            className={`mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500`}
                            {...register("validade", { required: "A validade é obrigatória." })}
                        />
                        {errors.validade && <small className="text-red-500 block mt-1">{errors.validade.message}</small>}
                    </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                    <button
                        type="submit"
                        className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                    >
                        {isEditing ? "Salvar Alterações" : "Adicionar Plano"}
                    </button>
                    {isEditing && (
                        <button
                            type="button" 
                            onClick={handleCancelEdit}
                            className="w-full py-4 px-4 border border-gray-400 rounded-full shadow-lg text-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Lista de Planos */}
            <div className="w-full max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-xl mt-10">
                <h3 className="text-2xl font-semibold text-black">Seus Planos de Saúde</h3>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <ul className="space-y-3">
                        {planos.length === 0 ? (
                            <p className="text-gray-500">Nenhum plano cadastrado.</p>
                        ) : (
                            planos.map(plano => (
                                <li key={plano.numeroCarteirinha} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center shadow-sm">
                                    <div>
                                        <span className="font-bold text-blue-600">{plano.nomePlano}</span>
                                        <p className="text-gray-800">Nº: {plano.numeroCarteirinha}</p>
                                        <small className="text-gray-500">Validade: {plano.validade}</small>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleSelectEdit(plano)}
                                            className="text-blue-500 hover:text-blue-700 font-semibold"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(plano.numeroCarteirinha)}
                                            className="text-red-500 hover:text-red-700 font-semibold"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}
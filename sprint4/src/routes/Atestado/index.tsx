import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Atestado, AtestadoForm } from '../../types/atestado'; 

const API_URL = "https://sprint4-quarkus.onrender.com";
const COR_FUNDO_BLOCO = '#d9d9d9';
const COR_TAG = '#acf0ff';


export default function AtestadoPage() {
    
    const [atestados, setAtestados] = useState<Atestado[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<Atestado | null>(null);

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm<AtestadoForm>(); 

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
    
    const fetchAtestados = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/atestado`);
            if (!response.ok) throw new Error("Falha ao buscar atestados");
            const data = await response.json();
            setAtestados(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAtestados();
    }, []); 

    const onSubmit = async (data: AtestadoForm) => {
        
        const dataPayload = data; 

        if (isEditing) {
            try {
                const response = await fetch(`${API_URL}/atestado/${isEditing.idAtestado}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataPayload)
                });
                if (!response.ok) throw new Error("Erro ao atualizar atestado");
                alert(`Atestado atualizado com sucesso!`);
                await fetchAtestados(); 
            } catch (error) {
                console.error(error);
                let msg = (error instanceof Error) ? error.message : "Tente novamente.";
                alert(`Falha ao atualizar: ${msg}`);
            }
        } else {
            try {
                const response = await fetch(`${API_URL}/atestado`, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataPayload)
                });
                if (!response.ok) throw new Error("Erro ao criar atestado");
                alert(`Atestado criado com sucesso!`);
                await fetchAtestados(); 
            } catch (error) {
                console.error(error);
                let msg = (error instanceof Error) ? error.message : "Tente novamente.";
                alert(`Falha ao criar: ${msg}`);
            }
        }
        reset();
        setIsEditing(null);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir este atestado?")) return;
        try {
            const response = await fetch(`${API_URL}/atestado/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Falha ao excluir");
            alert("Atestado excluído com sucesso!");
            setAtestados(lista => lista.filter(a => a.idAtestado !== id));
        } catch (error) {
            console.error(error);
            let msg = (error instanceof Error) ? error.message : "Tente novamente.";
            alert(`Erro ao excluir: ${msg}`);
        }
    };

    const handleSelectEdit = (atestado: Atestado) => {
        setIsEditing(atestado);
        reset(atestado); 
    };
    
    const handleCancelEdit = () => {
        setIsEditing(null);
        reset(); 
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10">
            
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
                        <span className="text-sm font-semibold text-black">ATESTADO</span>
                    </div>
                </div>
                <p className="text-sm font-semibold text-[#4c88cc] text-center">
                    Solicite ou gerencie seus atestados médicos.
                </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-xl">
                
                <h3 className="text-xl font-semibold">
                    {isEditing ? `Editando Atestado #${isEditing.idAtestado}` : "Solicitar Novo Atestado"}
                </h3>

                <div>
                    <label htmlFor="motivo" className="block text-sm font-medium text-gray-700">Motivo</label>
                    <input
                        id="motivo"
                        type="text"
                        placeholder="Ex: Quebrei o pé"
                        className={`mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500`}
                        {...register("motivo", { required: "O motivo é obrigatório." })}
                    />
                    {errors.motivo && <small className="text-red-500 block mt-1">{errors.motivo.message}</small>}
                </div>
                
                <div>
                    <label htmlFor="justificativa" className="block text-sm font-medium text-gray-700">Justificativa</label>
                    <textarea
                        id="justificativa"
                        rows={3}
                        placeholder="Ex: Estava jogando futebol"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        {...register("justificativa")}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="diasSolicitados" className="block text-sm font-medium text-gray-700">Dias Solicitados</label>
                        <input
                            id="diasSolicitados"
                            type="number"
                            placeholder="Ex: 30"
                            className={`mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500`}
                            {...register("diasSolicitados", { 
                                required: "Número de dias é obrigatório.",
                                valueAsNumber: true 
                            })}
                        />
                        {errors.diasSolicitados && <small className="text-red-500 block mt-1">{errors.diasSolicitados.message}</small>}
                    </div>

                    <div>
                        <label htmlFor="necessitaAtestadoTrabalho" className="block text-sm font-medium text-gray-700">Para o Trabalho?</label>
                        <select
                            id="necessitaAtestadoTrabalho"
                            className="mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                            {...register("necessitaAtestadoTrabalho", { required: "Este campo é obrigatório." })}
                        >
                            <option value="">-- Selecione --</option>
                            <option value="S">Sim</option>
                            <option value="N">Não</option>
                        </select>
                        {errors.necessitaAtestadoTrabalho && <small className="text-red-500 block mt-1">{errors.necessitaAtestadoTrabalho.message}</small>}
                    </div>
                </div>
                
                <div className="flex gap-4 mt-8">
                    <button
                        type="submit"
                        className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                    >
                        {isEditing ? "Salvar Alterações" : "Solicitar Atestado"}
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

            <div className="w-full max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-xl mt-10">
                <h3 className="text-2xl font-semibold text-black">Seus Atestados</h3>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <ul className="space-y-3">
                        {atestados.length === 0 ? (
                            <p className="text-gray-500">Nenhum atestado solicitado.</p>
                        ) : (
                            atestados.map(item => (
                                <li key={item.idAtestado} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center shadow-sm">
                                    <div>
                                        <span className="font-bold text-blue-600">{item.motivo}</span>
                                        <p className="text-gray-800">Dias: {item.diasSolicitados}</p>
                                        <small className="text-gray-500">Justificativa: {item.justificativa || "N/A"}</small>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleSelectEdit(item)}
                                            className="text-blue-500 hover:text-blue-700 font-semibold"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.idAtestado)}
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
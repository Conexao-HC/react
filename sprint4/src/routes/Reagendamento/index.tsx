import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Reagendamento, ReagendamentoForm } from '../../types/reagendamento'; 
import SectionHeader from '../../components/SecaoHeader/SecaoHeader';
import fotoLupa from '../../assets/img/lupa.png';
import fotoCalendario from '../../assets/img/calendar.png';


const API_URL = "https://sprint4-quarkus.onrender.com";

export default function Reagendamento() {
    
    const [reagendamentos, setReagendamentos] = useState<Reagendamento[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<Reagendamento | null>(null);

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm<ReagendamentoForm>(); 


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
    
    const fetchReagendamentos = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/reagendamento`);
            if (!response.ok) throw new Error("Falha ao buscar reagendamentos");
            const data = await response.json();
            setReagendamentos(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    
    useEffect(() => {
        fetchReagendamentos();
    }, []); 

    const onSubmit = async (data: ReagendamentoForm) => {
        
        const dataPayload = {
            ...data,
            idConsultaAnterior: Number(data.idConsultaAnterior)
        };

        if (isEditing) {
            try {
                const response = await fetch(`${API_URL}/reagendamento/${isEditing.idReagendamento}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataPayload)
                });
                if (!response.ok) throw new Error("Erro ao atualizar reagendamento");
                alert(`Reagendamento atualizado com sucesso!`);
                await fetchReagendamentos();
            } catch (error) {
                console.error(error);
                let msg = (error instanceof Error) ? error.message : "Tente novamente.";
                alert(`Falha ao atualizar: ${msg}`);
            }
        } else {
            try {
                const response = await fetch(`${API_URL}/reagendamento`, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataPayload)
                });
                if (!response.ok) throw new Error("Erro ao criar reagendamento");
                alert(`Reagendamento criado com sucesso!`);
                await fetchReagendamentos();
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
        if (!window.confirm("Tem certeza que deseja excluir este reagendamento?")) return;
        try {
            const response = await fetch(`${API_URL}/reagendamento/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error("Falha ao excluir");
            alert("Reagendamento excluído com sucesso!");
            setReagendamentos(lista => lista.filter(r => r.idReagendamento !== id));
        } catch (error) {
            console.error(error);
            let msg = (error instanceof Error) ? error.message : "Tente novamente.";
            alert(`Erro ao excluir: ${msg}`);
        }
    };

    const handleSelectEdit = (reagendamento: Reagendamento) => {
        setIsEditing(reagendamento);
        reset(reagendamento); 
    };
    
    const handleCancelEdit = () => {
        setIsEditing(null);
        reset(); 
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10">
            
            <SectionHeader
                tituloPrincipal={`Olá, ${nomeUsuario}!`}
                tagSecundaria="REAGENDAMENTO"
                corTag="#acf0ff" 
            />
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-xl">
                
                <h3 className="text-xl font-semibold">
                    {isEditing ? `Editando Reagendamento #${isEditing.idReagendamento}` : "Novo Reagendamento"}
                </h3>

                <div>
                    <label htmlFor="idConsultaAnterior" className="block text-sm font-medium text-gray-700">Código da Consulta Anterior</label>
                    <div className="relative mt-1">
                        <img src={fotoLupa} alt="Lupa" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            id="idConsultaAnterior"
                            type="number"
                            placeholder="Código da consulta anterior"
                            className={`block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 ${isEditing ? 'bg-gray-100' : ''}`}
                            {...register("idConsultaAnterior", { required: "O ID da consulta é obrigatório." })}
                            readOnly={!!isEditing}
                        />
                    </div>
                    {errors.idConsultaAnterior && <small className="text-red-500 block mt-1">{errors.idConsultaAnterior.message}</small>}
                </div>
                
                <div>
                    <label htmlFor="atendimentoMesmoMedico" className="block text-sm font-medium text-gray-700">Atendimento com o mesmo médico?</label>
                    <select
                        id="atendimentoMesmoMedico"
                        className="mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                        {...register("atendimentoMesmoMedico", { required: "Este campo é obrigatório." })}
                    >
                        <option value="">-- Selecione --</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                    {errors.atendimentoMesmoMedico && <small className="text-red-500 block mt-1">{errors.atendimentoMesmoMedico.message}</small>}
                </div>

                <div>
                    <label htmlFor="novaData" className="block text-sm font-medium text-gray-700">Dia Preferencial (Nova Data)</label>
                    <div className="relative mt-1">
                        <img src={fotoCalendario} alt="Calendário" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            id="novaData"
                            type="date"
                            className="block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500"
                            {...register("novaData", { required: "Nova data é obrigatória." })}
                        />
                    </div>
                    {errors.novaData && <small className="text-red-500 block mt-1">{errors.novaData.message}</small>}
                </div>

                <div>
                    <label htmlFor="motivoRetorno" className="block text-sm font-medium text-gray-700">Motivo do Retorno</label>
                    <textarea
                        id="motivoRetorno"
                        rows={3}
                        placeholder="Descreva o motivo do retorno"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        {...register("motivoRetorno", { required: "O motivo é obrigatório." })}
                    />
                    {errors.motivoRetorno && <small className="text-red-500 block mt-1">{errors.motivoRetorno.message}</small>}
                </div>
                
                <div className="flex gap-4 mt-8">
                    <button
                        type="submit"
                        className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                    >
                        {isEditing ? "Salvar Alterações" : "Finalizar Reagendamento"}
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
                <h3 className="text-2xl font-semibold text-black">Seus Reagendamentos</h3>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <ul className="space-y-3">
                        {reagendamentos.length === 0 ? (
                            <p className="text-gray-500">Nenhum reagendamento solicitado.</p>
                        ) : (
                            reagendamentos.map(item => (
                                <li key={item.idReagendamento} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center shadow-sm">
                                    <div>
                                        <span className="font-bold text-blue-600">Consulta #{item.idConsultaAnterior}</span>
                                        <p className="text-gray-800">Nova Data: {item.novaData}</p>
                                        <small className="text-gray-500">Motivo: {item.motivoRetorno}</small>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleSelectEdit(item)}
                                            className="text-blue-500 hover:text-blue-700 font-semibold"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item.idReagendamento)}
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
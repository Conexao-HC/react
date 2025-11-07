import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { AgendamentoForm, Consulta } from '../../types/agendamento';
import fotoCalendario from '../../assets/img/calendar.png';
import fotoRelogio from '../../assets/img/relogio.png';

const medicos = [
    { value: 'Clinico Geral', label: 'Dr. João Silva (Clínico Geral)' },
    { value: 'Pediatra', label: 'Dra. Ana Santos (Pediatra)' },
    { value: 'Cardiologista', label: 'Dr. Carlos Oliveira (Cardiologista)' },
    { value: 'Ortopedista', label: 'Dr. Marcio Teixeira (Ortopedista)' }
];

const API_URL = "https://sprint4-quarkus.onrender.com";

export default function AgendamentoForm() {
    
    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<Consulta | null>(null);

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm<AgendamentoForm>({ 
        defaultValues: {
            data: '',
            horario: '',
            medico: { especialidade: '' }
        },
    });

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
    
    const fetchConsultas = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/consulta`);
            if (!response.ok) throw new Error("Falha ao buscar consultas");
            const data = await response.json();
            setConsultas(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchConsultas();
    }, []); 

    const onSubmit = async (data: AgendamentoForm) => {
        
        if (isEditing) {
            try {
                const response = await fetch(`${API_URL}/consulta/${isEditing.idConsulta}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) throw new Error("Erro ao reagendar consulta");

                alert(`Agendamento com ${data.medico.especialidade} atualizado!`);
                await fetchConsultas(); 

            } catch (error) {
                console.error(error);
                let errorMessage = "Erro desconhecido. Tente novamente.";
                if (error instanceof Error) errorMessage = error.message;
                alert(`Falha ao reagendar: ${errorMessage}`);
            }

        } else {
            try {
                const response = await fetch(`${API_URL}/consulta`, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (!response.ok) throw new Error("Erro ao agendar consulta");

                alert(`Agendamento com ${data.medico.especialidade} confirmado!`);
                await fetchConsultas(); 

            } catch (error) {
                console.error(error);
                let errorMessage = "Erro desconhecido. Tente novamente.";
                if (error instanceof Error) errorMessage = error.message;
                alert(`Falha no agendamento: ${errorMessage}`);
            }
        }
        
        reset();
        setIsEditing(null); 
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja cancelar esta consulta?")) return;

        try {
            const response = await fetch(`${API_URL}/consulta/${id}`, { 
                method: 'DELETE' 
            });
            if (!response.ok) throw new Error("Falha ao cancelar consulta");

            alert("Consulta cancelada com sucesso!");
            setConsultas(listaAtual => listaAtual.filter(c => c.idConsulta !== id));

        } catch (error) {
            console.error(error);
            let errorMessage = "Erro desconhecido. Tente novamente.";
            if (error instanceof Error) errorMessage = error.message;
            alert(`Erro ao cancelar: ${errorMessage}`);
        }
    };

    const handleSelectEdit = (consulta: Consulta) => {
        setIsEditing(consulta);
        reset(consulta); 
    };
    
    const handleCancelEdit = () => {
        setIsEditing(null);
        reset(); 
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10">
            
            <div className="w-full max-w-lg bg-[#d9d9d9] p-4 rounded-lg shadow-xl mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-semibold text-black">Olá, {nomeUsuario}!</h2>
                    <div className="bg-[#acf0ff] px-4 py-2 rounded-md shadow-md">
                        <span className="text-sm font-semibold text-black">AGENDAMENTO</span>
                    </div>
                </div>
                <p className="text-sm font-semibold text-[#4c88cc]">
                    Se você está com dificuldade para usar o site de auxílio médico, posso te ajudar!
                    Vá com calma, lendo cada parte da tela com atenção. Tente identificar os menus principais e clique com paciência. Se travar em alguma parte, vamos resolver juntos.
                </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-xl">
                
                <h3 className="text-xl font-semibold">
                    {isEditing ? `Reagendando Consulta #${isEditing.idConsulta}` : "Novo Agendamento"}
                </h3>

                <div>
                    <label htmlFor="medicoSelecionado" className="block text-sm font-medium text-gray-700">Selecione a Especialidade</label>
                    <select
                        id="medicoSelecionado"
                        className="mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                        {...register("medico.especialidade", { required: "Selecione uma especialidade." })}
                    >
                        <option value="">-- Escolha uma especialidade --</option>
                        {medicos.map(medico => (
                            <option key={medico.value} value={medico.value}>{medico.label}</option>
                        ))}
                    </select>
                    {errors.medico?.especialidade && <small className="text-red-500 block mt-1">{errors.medico.especialidade.message}</small>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data da Consulta</label>
                        <div className="relative mt-1">
                            <img src={fotoCalendario} alt="Calendário" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                            <input
                                id="data"
                                type="date"
                                className="block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500"
                                {...register("data", { required: "Data é obrigatória." })}
                            />
                        </div>
                        {errors.data && <small className="text-red-500 block mt-1">{errors.data.message}</small>}
                    </div>
                    <div>
                        <label htmlFor="horario" className="block text-sm font-medium text-gray-700">Horário</label>
                        <div className="relative mt-1">
                            <img src={fotoRelogio} alt="Relógio" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                            <input
                                id="horario"
                                type="time"
                                className="block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500"
                                {...register("horario", { required: "Horário é obrigatório." })}
                            />
                        </div>
                        {errors.horario && <small className="text-red-500 block mt-1">{errors.horario.message}</small>}
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button
                        type="submit"
                        className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                    >
                        {isEditing ? "Salvar Reagendamento" : "Finalizar Agendamento"}
                    </button>
                    
                    {isEditing && (
                        <button
                            type="button" 
                            onClick={handleCancelEdit}
                            className="w-full py-4 px-4 border border-gray-400 rounded-full shadow-lg text-xl font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="w-full max-w-lg space-y-4 bg-white p-6 rounded-lg shadow-xl mt-10">
                <h3 className="text-2xl font-semibold text-black">Suas Consultas</h3>
                {isLoading ? (
                    <p>Carregando consultas...</p>
                ) : (
                    <ul className="space-y-3">
                        {consultas.length === 0 ? (
                            <p className="text-gray-500">Nenhuma consulta agendada.</p>
                        ) : (
                            consultas.map(consulta => (
                                <li key={consulta.idConsulta} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center shadow-sm">
                                    <div>
                                        <span className="font-bold text-blue-600">{consulta.medico.especialidade}</span>
                                        <p className="text-gray-800">Data: {consulta.data}</p>
                                        <small className="text-gray-500">Horário: {consulta.horario}</small>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleSelectEdit(consulta)}
                                            className="text-blue-500 hover:text-blue-700 font-semibold"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(consulta.idConsulta)}
                                            className="text-red-500 hover:text-red-700 font-semibold"
                                        >
                                            Cancelar
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
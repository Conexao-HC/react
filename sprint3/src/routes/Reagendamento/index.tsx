import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { AgendamentoExistente, AgendamentoFormData } from '../../types/agendamento';
import SectionHeader from '../../components/SecaoHeader/SecaoHeader';
import fotoLupa from '../../assets/img/lupa.png'
import fotoCalendario from '../../assets/img/calendar.png'
import fotoGostar from '../../assets/img/gostar.png'
import fotoEscreve from '../../assets/img/escreva.png'

const agendamentoExemplo: AgendamentoExistente = {
    pacienteId: '',
    nomePaciente: '',
    email: '',
    medicoSelecionado: '', 
    dataConsulta: '',
    horarioConsulta: '',
    motivo: '',
};

const medicos = [
    { value: 'Dr. Silva', label: 'Dr. João Silva (Clínico Geral)' },
    { value: 'Dra. Santos', label: 'Dra. Ana Santos (Pediatra)' },
    { value: 'Dr. Oliveira', label: 'Dr. Carlos Oliveira (Cardiologista)' },
    { value: 'Dr. Teixeira', label: 'Dr. Marcio Teixeira (Ortopedista)' }
];

export default function Reagendamento() {
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm<AgendamentoFormData>();

    const navigate = useNavigate();

    const usuarioJson = localStorage.getItem('usuarioCadastrado');
    let nomeUsuario = "Paciente";

    if (usuarioJson) {
        try {
            const usuario = JSON.parse(usuarioJson);
            nomeUsuario = usuario.nome ? usuario.nome.split(' ')[0] : "Paciente"; 
        } catch (e) {
            console.error("Erro ao ler dados de usuário:", e);
        }
    }
    
    useEffect(() => {
        const dadosPreenchidos: AgendamentoFormData = {
            nomePaciente: agendamentoExemplo.nomePaciente,
            email: agendamentoExemplo.email,
            medicoSelecionado: agendamentoExemplo.medicoSelecionado,
            dataConsulta: agendamentoExemplo.dataConsulta,
            horarioConsulta: agendamentoExemplo.horarioConsulta,
            motivo: agendamentoExemplo.motivo,
        };

        reset(dadosPreenchidos); 
    }, [reset]); 

    const onSubmit = (data: AgendamentoFormData) => {
        console.log("Dados de Reagendamento Enviados:", data);
        alert(`Reagendamento concluído com sucesso!`);
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10">
            
            <SectionHeader
                tituloPrincipal={`Olá, ${nomeUsuario}!`}
                tagSecundaria="REAGENDAMENTO"
                corTag="#acf0ff" 
            />
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-xl">
                
                <div>
                    <label htmlFor="consultaAnterior" className="block text-sm font-medium text-gray-700">Código da Consulta Anterior</label>
                    <div className="relative mt-1">
                        <img src={fotoLupa} alt="Lupa" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            
                            type="number"
                            placeholder="Código da consulta anterior"
                            className="block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 bg-gray-100"
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="medicoSelecionado" className="block text-sm font-medium text-gray-700">Atendimento com o mesmo médico?</label>
                    <select
                        id="medicoSelecionado"
                        className="mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                        {...register("medicoSelecionado", { required: "Selecione um médico." })}
                    >
                        <option value="">-- Escolha o médico ou mantenha o anterior --</option>
                        {medicos.map(medico => (
                            <option key={medico.value} value={medico.value}>{medico.label}</option>
                        ))}
                    </select>
                    {errors.medicoSelecionado && <small className="text-red-500 block mt-1">{errors.medicoSelecionado.message}</small>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dataConsulta" className="block text-sm font-medium text-gray-700">Dia Preferencial (Nova Data)</label>
                        <div className="relative mt-1">
                            <img src={fotoCalendario} alt="Calendário" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                            <input
                                id="dataConsulta"
                                type="date"
                                className="block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500"
                                {...register("dataConsulta", { required: "Nova data é obrigatória." })}
                            />
                        </div>
                        {errors.dataConsulta && <small className="text-red-500 block mt-1">{errors.dataConsulta.message}</small>}
                    </div>
                    <div>
                        <label htmlFor="horarioConsulta" className="block text-sm font-medium text-gray-700">Novo Horário</label>
                        <div className="relative mt-1">
                            <img src={fotoEscreve} alt="Lápis" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                            <input
                                id="horarioConsulta"
                                type="time"
                                className="block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500"
                                {...register("horarioConsulta", { required: "Novo horário é obrigatório." })}
                            />
                        </div>
                        {errors.horarioConsulta && <small className="text-red-500 block mt-1">{errors.horarioConsulta.message}</small>}
                    </div>
                </div>

                <div>
                    <label htmlFor="motivo" className="block text-sm font-medium text-gray-700">Motivo do Retorno (Motivo Anterior)</label>
                    <textarea
                        id="motivo"
                        rows={3}
                        placeholder="Motivo do retorno"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        {...register("motivo")}
                    />
                     <small className="flex items-center text-gray-500 text-xs mt-1">
                        <img src={fotoGostar} alt="Like" className="w-4 h-4 mr-1" />
                        O motivo do agendamento anterior já foi pré-preenchido.
                    </small>
                </div>
                

                <button
                    type="submit"
                    className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-8"
                >
                    Finalizar Reagendamento
                </button>
            </form>
        </div>
    );
}
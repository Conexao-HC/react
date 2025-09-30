import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { AgendamentoFormData } from '../../types/agendamento';


const medicos = [
    { value: 'Dr. Silva', label: 'Dr. João Silva (Clínico Geral)' },
    { value: 'Dra. Santos', label: 'Dra. Ana Santos (Pediatra)' },
    { value: 'Dr. Oliveira', label: 'Dr. Carlos Oliveira (Cardiologista)' },
    { value: 'Dr. Teixeira', label: 'Dr. Marcio Teixeira (Ortopedista)' }
];

export default function AgendamentoForm() {
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<AgendamentoFormData>({
        defaultValues: {
            nomePaciente: '', 
            email: '', 
            medicoSelecionado: '', 
            dataConsulta: '',
            horarioConsulta: '',
            motivo: '',
        },
    });

    const navigate = useNavigate();

    const onSubmit = (data: AgendamentoFormData) => {
        alert(`Agendamento confirmado para ${data.nomePaciente} em ${data.dataConsulta}!`);
        navigate('/agendamento'); 
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 py-10">
            
            <div className="w-full max-w-lg bg-[#d9d9d9] p-4 rounded-lg shadow-xl mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-semibold text-black">Olá, Paciente!</h2>
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
                
                <div>
                    <label htmlFor="nomePaciente" className="block text-sm font-medium text-gray-700">Seu Nome Completo</label>
                    <div className="relative mt-1">
                         <img src="/Challenge front-end/assets/img/lupa.png" alt="Lupa" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                        <input
                            id="nomePaciente"
                            type="text"
                            placeholder="Nome"
                            className="block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500"
                            {...register("nomePaciente", { 
                                required: "Nome é obrigatório.", 
                                minLength: { value: 5, message: "Use o nome completo." } 
                            })}
                        />
                    </div>
                    {errors.nomePaciente && <small className="text-red-500 block mt-1">{errors.nomePaciente.message}</small>}
                </div>
                
                <div>
                    <label htmlFor="medicoSelecionado" className="block text-sm font-medium text-gray-700">Selecione o Médico</label>
                    <select
                        id="medicoSelecionado"
                        className="mt-1 block w-full border border-[#1277bd] rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                        {...register("medicoSelecionado", { required: "Selecione um médico." })}
                    >
                        <option value="">-- Escolha um médico --</option>
                        {medicos.map(medico => (
                            <option key={medico.value} value={medico.value}>{medico.label}</option>
                        ))}
                    </select>
                    {errors.medicoSelecionado && <small className="text-red-500 block mt-1">{errors.medicoSelecionado.message}</small>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dataConsulta" className="block text-sm font-medium text-gray-700">Data da Consulta</label>
                        <div className="relative mt-1">
                            <img src="/Challenge front-end/assets/img/calendar.png" alt="Calendário" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                            <input
                                id="dataConsulta"
                                type="date"
                                className="block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500"
                                {...register("dataConsulta", { required: "Data é obrigatória." })}
                            />
                        </div>
                        {errors.dataConsulta && <small className="text-red-500 block mt-1">{errors.dataConsulta.message}</small>}
                    </div>
                    <div>
                        <label htmlFor="horarioConsulta" className="block text-sm font-medium text-gray-700">Horário</label>
                        <div className="relative mt-1">
                            <img src="/Challenge front-end/assets/img/relogio.png" alt="Relógio" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 opacity-50" />
                            <input
                                id="horarioConsulta"
                                type="time"
                                className="block w-full border border-[#1277bd] rounded-lg shadow-sm pl-10 pr-3 py-3 focus:ring-blue-500 focus:border-blue-500"
                                {...register("horarioConsulta", { required: "Horário é obrigatório." })}
                            />
                        </div>
                        {errors.horarioConsulta && <small className="text-red-500 block mt-1">{errors.horarioConsulta.message}</small>}
                    </div>
                </div>

                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Seu E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                        {...register("email", { 
                            required: "E-mail é obrigatório.",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Formato de e-mail inválido"
                            }
                        })}
                    />
                    {errors.email && <small className="text-red-500 block mt-1">{errors.email.message}</small>}
                </div>

                <div>
                    <label htmlFor="motivo" className="block text-sm font-medium text-gray-700">Motivo da Consulta (Opcional)</label>
                    <textarea
                        id="motivo"
                        rows={3}
                        placeholder="Descreva brevemente o motivo"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        {...register("motivo")}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-4 px-4 border border-transparent rounded-full shadow-lg text-xl font-semibold text-white bg-[#4c88cc] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-8"
                >
                    Finalizar Agendamento
                </button>
            </form>
        </div>
    );
}
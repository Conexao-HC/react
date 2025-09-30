export type AgendamentoFormData = {
    nomePaciente: string;
    email: string;
    medicoSelecionado: string; 
    dataConsulta: string;
    horarioConsulta: string;
    motivo: string; 
};

export type AgendamentoExistente = {
    pacienteId: string;
    nomePaciente: string;
    email: string;
    medicoSelecionado: string;
    dataConsulta: string;
    horarioConsulta: string;
    motivo: string;
    
};
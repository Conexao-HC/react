
export type Medico = {
  especialidade: string;
};

export type AgendamentoForm = {
  data: string;
  horario: string;
  medico: Medico; 
};

export type Consulta = {
  idConsulta: number;
  data: string;
  horario: string;
  medico: Medico;
};
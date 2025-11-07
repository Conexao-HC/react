export type AtestadoForm = {
  motivo: string;
  justificativa: string;
  diasSolicitados: number;
  necessitaAtestadoTrabalho: string; 
};

export type Atestado = {
  idAtestado: number;
} & AtestadoForm; 
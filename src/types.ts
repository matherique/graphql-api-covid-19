export interface HistoricoType {
  data: string;
  casosAcumulados: number;
  casosNovos: number;
  obitosAcumulados: number;
  obitosNovos: number;
}

export interface EstadoType {
  nome: string;
  casos: number;
  obitos: number;
  regiao: string;
  historico: HistoricoType[];
}

export interface RegiaoType {
  nome: string;
  casos: number;
  obitos: number;
  estados: EstadoType[];
  historico?: HistoricoType[];
}

export interface CovidType {
  casos: number;
  obitos: number;
  regioes: RegiaoType[];
  historico?: HistoricoType[];
}

export interface DataFileType {
  updated_at: string;
  created_at: string;
  dados: CovidType;
}


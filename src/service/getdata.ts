import * as fs from 'fs';
import * as path from 'path';

import { 
  RegiaoType,
  CovidType,
  HistoricoType,
  EstadoType 
} from '../types';

function cleanData(data: string[]): CovidType { 
  const regioes: RegiaoType[] = [];

  data.shift();
  data.map(line => {
    const d = line.split(';');

    if (d[0] === '') return;

    let currentRegiao = regioes.find(r => r.nome === d[0]); 

    if (!currentRegiao) {
      regioes.push({ 
      nome: d[0],
        estados: [],
        casos: 0,
        obitos: 0
      });
      currentRegiao = regioes[regioes.length - 1];
    }
    
    let currentEstado = currentRegiao.estados.find(e => e.nome === d[1]);

    if (!currentEstado) {
      currentRegiao.estados.push({ 
        nome: d[1],
        historico: [],
        casos: 0,
        obitos: 0,
        regiao: currentRegiao.nome
      });
    }
    
    currentEstado = currentRegiao.estados.find(e => e.nome === d[1]);

    let hc: HistoricoType = {
      data: new Date(d[2]).toUTCString(),
      casosNovos:  parseInt(d[3]),
      casosAcumulados:  parseInt(d[4]),
      obitosNovos:  parseInt(d[5]),
      obitosAcumulados:  parseInt(d[6]), 
    }
    
    currentEstado.historico.push(hc);
      currentEstado.casos = hc.casosAcumulados;
    currentEstado.obitos = hc.obitosAcumulados;
    
    currentRegiao.casos = currentRegiao.estados.reduce((p, c) => p + c.casos, 0);
    currentRegiao.obitos = currentRegiao.estados.reduce((p, c) => p + c.obitos, 0);
  });

  const dadosCovid: CovidType = { casos: 0, obitos: 0, regioes }

  dadosCovid.casos = regioes.reduce((p, c) => p + c.casos, 0);
  dadosCovid.obitos = regioes.reduce((p, c) => p + c.obitos, 0);
  
  return dadosCovid;
}

const file = path.resolve(__dirname, "../data/arquivo_geral.csv");
const content = fs.readFileSync(file).toString().split("\n");
const covid = cleanData(content);

//const jsonFile = path.resolve(__dirname, "../data/data.json");
//const jsonData: DataFileType = {
  //dados: covid,
  //updated_at: new Date().toUTCString(),
  //created_at: new Date().toUTCString(),
//}

//fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null,  4));

function getEstados(dadosCovid: CovidType): Record<string,EstadoType> {
  const estados: Record<string,EstadoType> = {};
  dadosCovid.regioes.forEach(r => 
    r.estados.forEach(e => estados[e.nome] = { regiao: r.nome, ...e})
  ); 
  
  return estados;
}

export const estados = getEstados(covid);
export default covid;


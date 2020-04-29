import * as fs from 'fs';
import * as path from 'path';

import { RegiaoType, CovidType, HistoricoType, EstadoType, DataFileType } from '../types';

function cleanData(data: string[]): CovidType { 
  const regioes: RegiaoType[] = [];

  data.shift();
  data.map(line => {
    const d = line.split(';');

    if (d[0] === '') return;

    let regiao = regioes.find(r => r.nome === d[0]); 

    if (!regiao) {
      regioes.push({ nome: d[0], estados: [], casos: 0, obitos: 0 });
      regiao = regioes[regioes.length - 1];
    }
    
    let estado = regiao.estados.find(e => e.nome === d[1]);

    if (!estado) {
      regiao.estados.push({ nome: d[1], historico: [], casos: 0, obitos: 0 });
    }
    
    estado = regiao.estados.find(e => e.nome === d[1]);

    let hc: HistoricoType = {
      data: new Date(d[2]).toUTCString(),
      casosAcumulados:  parseInt(d[3]),
      casosNovos:  parseInt(d[4]),
      obitosNovos:  parseInt(d[5]),
      obitosAcumulados:  parseInt(d[6]), 
    }
    
    estado.historico.push(hc);
    estado.casos = hc.casosNovos;
    estado.obitos = hc.obitosAcumulados;
    
    regiao.casos = regiao.estados.reduce((p, c) => p + c.casos, 0);
    regiao.obitos = regiao.estados.reduce((p, c) => p + c.obitos, 0);
  });

  const covid: CovidType = { casos: 0, obitos: 0, regioes }

  covid.casos = regioes.reduce((p, c) => p + c.casos, 0);
  covid.obitos = regioes.reduce((p, c) => p + c.obitos, 0);
  
  return covid;
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

function getEstados(data: CovidType): Record<string,EstadoType> {
  const estados: Record<string,EstadoType> = {};
  data.regioes.forEach(r => r.estados.forEach(e => estados[e.nome] = e)); 
  
  return estados;
}

export const estados = getEstados(covid);
export default covid;

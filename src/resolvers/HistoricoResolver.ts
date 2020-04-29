import { Resolver, Query, Arg } from 'type-graphql';

import data, { estados } from '../service/getdata';
import { Regiao, Estado, Covid, Historico } from '../entity';

@Resolver()
export default class HistoricoResolver {
  @Query(() => [Regiao], { description: "Retorna o historico de casos"})
  historico(
    @Arg("estado", { nullable: true }) estado: string,
    @Arg("regiao", { nullable: true }) regiao: string,
  ): Historico[] {
    let historico: Historico[] = [];

    if (estado !== null) {
      historico = estados[estado].historico;
    }

    
    
    return historico;
  }
}

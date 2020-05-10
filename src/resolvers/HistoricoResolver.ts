import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';

import data, { estados } from '../service/getdata';
import { Regiao, Estado, Covid, Historico } from '../entity';

@Resolver(of => Historico)
export default class HistoricoResolver {
  @FieldResolver()
  data(@Root() historico: Historico): string {
    const data = new Date(historico.data);
    return `${data.getDate()}/${data.getMonth()+1}`; 
  }

  @Query(() => Historico, { nullable: true })
  historicoEstado(@Arg("sigla") sigla: string, @Arg("data") data: string): Historico {
    const historico = estados[sigla.toUpperCase()].historico;
    const historicoData = historico.find(h => h.data === new Date(data).toUTCString());

    return historicoData;
  }

}

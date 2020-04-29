import { Resolver, Query, Arg } from 'type-graphql';

import data from '../service/getdata';
import { Regiao, Estado, Covid } from '../entity';

@Resolver()
export default class RegiaoResolver {
  @Query(() => [Regiao])
  regioes(): Regiao[] {
    return data.regioes;
  } 

  @Query(() => Regiao)
  regiao(@Arg("nome") nome: string): Regiao {
    return data.regioes.find(r => r.nome.toLowerCase() === nome.toLowerCase());
  } 
}



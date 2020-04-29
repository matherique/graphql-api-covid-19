import { Resolver, Query, Arg } from 'type-graphql';

import data, { estados } from '../service/getdata';
import { Regiao, Estado, Covid } from '../entity';

@Resolver()
export default class EstadoResolver {
  @Query(() => Estado)
  estado(@Arg("nome") nome: string): Estado {
    return estados[nome.toUpperCase()];
  }

  @Query(() => [Estado])
  estados(): Estado[] { 
    return Object.values(estados);  
  }
}

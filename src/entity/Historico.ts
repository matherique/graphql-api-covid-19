import { ObjectType, Field, Int} from 'type-graphql';

import { HistoricoType } from '../types';

@ObjectType()
export default class Historico implements HistoricoType {
  @Field(() => String)
  data: string;

  @Field(() => Int)
  casosNovos: number;

  @Field(() => Int)
  casosAcumulados: number;

  @Field(() => Int)
  obitosNovos: number;

  @Field(() => Int)
  obitosAcumulados: number;
}


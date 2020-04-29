import { ObjectType, Field, Int } from 'type-graphql';

import { EstadoType } from '../types';
import Historico from './Historico';

@ObjectType()
export default class Estado implements EstadoType {
  @Field(() => String)
  nome: string;

  @Field(() => [Historico])
  historico: Historico[];

  @Field(() => Int)
  casos: number;

  @Field(() => Int)
  obitos: number;
}


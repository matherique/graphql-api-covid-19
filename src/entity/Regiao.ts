import { ObjectType, Field, Int } from 'type-graphql';

import { RegiaoType } from '../types';
import Estado from './Estado';

@ObjectType()
export default class Regiao implements RegiaoType {
  @Field(() => String)
  nome: string;
  
  @Field(() => Int)
  casos: number;
  
  @Field(() => Int)
  obitos: number;

  @Field(() => [Estado], { nullable: true })
  estados: Estado[];
}


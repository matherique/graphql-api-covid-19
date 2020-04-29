import { ObjectType, Field, Int } from 'type-graphql';

import Estado from './Estado';
import Regiao from './Regiao';
import { CovidType } from '../types';

@ObjectType()
export default class Covid implements CovidType {
  @Field(() => Int)
  casos: number;
  
  @Field(() => Int)
  obitos: number;
  
  @Field(() => [Regiao])
  regioes: Regiao[];
}


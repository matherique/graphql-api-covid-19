import { Resolver, Query, Arg } from 'type-graphql';

import data from '../service/getdata';
import { Regiao, Estado, Covid } from '../entity';

@Resolver()
export default class CovidResolver {
  @Query(() => Covid)
  covid(): Covid {
    return data;
  } 
}


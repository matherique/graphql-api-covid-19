import { Request, Response } from 'express';

import data from '../service/getdata';
import { Covid } from '../types';


class CovidController {
  index(req: Request, res: Response): Response<Covid[]> {
    return res.send(data);
  }
  
  regiao(req: Request, res: Response): Response<Covid> {
    const { nome } = req.params;
    const response = data.find(r => r.regiao.toLowerCase() === nome?.toLowerCase());
    return res.send(response);
  }
}

export default new CovidController();


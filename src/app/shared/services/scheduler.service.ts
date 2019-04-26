import { Injectable } from '@angular/core';

import { Refeicao } from '../interfaces/refeicao';
import { Restaurante } from '../interfaces/restaurante';
import { Dia } from '../interfaces/dia';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  public restaurantes: Restaurante[] = [
    {id: 1, nome: "RU - Campus I"},
    {id: 41, nome: "RU - Campus II"}
  ];

  public tiposRefeicoes: Refeicao[] = [
    {id: 1, nome: "Café"},
    {id: 2, nome: "Almoço"},
    {id: 3, nome: "Jantar"},
    {id: 4, nome: "Distribuição"},
    {id: 5, nome: "Distribuição - Kit Desjejum"}
  ];

  public diasSemana: Dia[] = [
    {id: 0, nome: "Domingo"},
    {id: 1, nome: "Segunda"},
    {id: 2, nome: "Terça-feira"},
    {id: 3, nome: "Quarta-feira"},
    {id: 4, nome: "Quinta-feira"},
    {id: 5, nome: "Sexta-feira"},
    {id: 6, nome: "Sábado"},
  ];

  constructor() { }

}

import { Pipe, PipeTransform } from '@angular/core';
import { SchedulerService } from '../services/schedule/scheduler.service';

@Pipe({
  name: 'meal'
})
export class MealPipe implements PipeTransform {

  constructor(
    private schedulerService: SchedulerService
  ){}

  transform(refeicoes: number[]): string {
    const allTiposRefeicoes = this.schedulerService.getTiposRefeicoes();
    let refeicoesName = [];
    for (let refeicaoID of refeicoes) {
        let refeicaoName = allTiposRefeicoes.find((refeicaoSearch) => {
          return refeicaoSearch.id === refeicaoID;
        });
        refeicoesName.push(refeicaoName.nome);
    }
    return refeicoesName.join(', ').replace(/,([^,]*)$/,' \e$1');//Junta o array e troca a ultima ',' por 'e'
  }

}

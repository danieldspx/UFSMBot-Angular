import { Pipe, PipeTransform } from '@angular/core';

import { SchedulerService } from '../services/schedule/scheduler.service';
import { Dia } from '../interfaces/dia';
import { isUndefined } from 'util';

@Pipe({
  name: 'weekday'
})
export class WeekdayPipe implements PipeTransform {

  constructor(
    private schedulerService: SchedulerService
  ){}

  transform(weekdays: number[]): string {
    weekdays = weekdays.sort();//Ordena o array
    return this.convertToHumanFormat(weekdays);
  }

  getShortWeek(day: number): string{
    let weekDayShort = this.schedulerService.getDiasSemana().find((weekday: Dia) => {
      return weekday.id === day;
    });
    return weekDayShort.short;
  }

  convertToHumanFormat(weekDaysNumber: number[]): string{
    let chunksDays = [];
    let contador = 0;
    let sequentialDays = [];
    weekDaysNumber.forEach((day, index) => {//Chunk sequential days
      if(isUndefined(chunksDays[contador])){
        chunksDays[contador] = {};
      }
      this.appendPosition(chunksDays[contador], day);
      if(this.isntLastPosition(index, weekDaysNumber)){
        const dayAfter = weekDaysNumber[index+1];
        if(day !== (dayAfter-1)){//Next number isnt sequential
          contador++;
        }
      }
    });

    for(let chunk of chunksDays){
      if(chunk.start !== chunk.end){
        sequentialDays.push(`
          ${this.getShortWeek(chunk.start)}-${this.getShortWeek(chunk.end)}
          `);
      } else {
        sequentialDays.push(this.getShortWeek(chunk.start))
      }
    }
    return sequentialDays.join(', ').replace(/,([^,]*)$/,' \e$1');//Troca a ultima ',' por 'e'
  }

  appendPosition(item: any, day: number){
    if(isUndefined(item.start)){
      item.start = day;
    }
    item.end = day;
  }

  isntLastPosition(index: number, arrayTarget: number[]): boolean{
    return index+1 !== arrayTarget.length;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { SchedulerService } from '../services/schedule/scheduler.service';

@Pipe({
  name: 'restaurant'
})
export class RestaurantPipe implements PipeTransform {

  constructor(
    private schedulerService: SchedulerService
  ){}

  transform(restaurantID: number): string {
    const restaurantFinded = this.schedulerService.
    getRestaurantes().find(restaurant => restaurant.id === restaurantID);
    return restaurantFinded.nome;
  }

}

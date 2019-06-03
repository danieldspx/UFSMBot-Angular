import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation-loading',
  templateUrl: './animation-loading.component.html',
  styleUrls: ['./animation-loading.component.scss']
})
export class AnimationLoadingComponent implements OnInit {

  public lottieConfig: Object;

  constructor() {
    this.lottieConfig = {
      path: '/assets/animations/food-loading.json',
      autoplay: true,
      loop: true
    };
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="flex header">
      <a routerLink="/card-form">New Card</a>
      <a routerLink="/search">Search</a>
    </div>
  `
})

export class AppHeaderComp implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
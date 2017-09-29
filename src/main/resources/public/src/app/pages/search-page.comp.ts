import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { Card } from "../model/Card";
import { LoginService } from "../services/login.service";

@Component({
  selector: 'search-page',
  templateUrl: 'html/pages/search-page.comp.html',
  styleUrls: ['css/pages/search-page.comp.css'],
})

export class SearchPageComp implements OnInit {

  query: string;
  cards: Card[];
  card: Card = new Card();
  hasList: boolean = true;

  constructor(private api: ApiService, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  onSearchClick() {
    const url = this.loginService.currentUser().role === 'ADMIN' ? 'card/admin' : 'card';
    this.api.list<Card>(url, {number: this.query})
        .then(list => {
          if (list.length === 1) {
            this.card = list[0];
            this.cards = [];
            this.hasList = false;
          } else {
            this.cards = list;
            this.card = new Card();
            this.hasList = true;
          }
        });
  }
}
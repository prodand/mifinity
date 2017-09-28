import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { Card } from "../model/Card";

@Component({
  selector: 'card-form-page',
  templateUrl: 'html/pages/card-form-page.comp.html',
  styleUrls: ['css/pages/card-form-page.comp.css'],
})
export class CardFormPageComp implements OnInit {

  number: string;
  name: string;
  expireMonth: number;
  expireYear: number;
  months: number[];
  years: number[];
  successMessage: string;
  errorMessage: string;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    let counter = 1;
    this.months = Array.apply(0, Array(12)).map(val => counter++);
    let yearCounter = (new Date()).getFullYear() + 1;
    this.years = Array.apply(0, Array(12)).map(val => yearCounter++);

    this.expireMonth = this.months[0];
    this.expireYear = this.years[0];
  }

  onSubmitCard() {
    const date = new Date(0);
    date.setFullYear(this.expireYear, this.expireMonth);
    this.api.create<Card>("card", {
      number: this.number,
      name: this.name,
      expireDate: date
    })
        .then(card => {
          this.success(`${card.name} created`);
          setTimeout(() => this.success(""), 2000);
        })
        .catch(error => {
          this.showError(`${error.status} - ${error.json().join(", ")}`);
        })
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.successMessage = "";
  }

  private success(message: string) {
    this.errorMessage = "";
    this.successMessage = message;
  }
}
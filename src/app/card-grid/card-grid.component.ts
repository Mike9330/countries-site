import { Component, Input } from '@angular/core';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss']
})
export class CardGridComponent {

country: any = {};
lang: any;
currency: any;
capital: any;
population: any;
countrySelected = false;

  constructor(private countryService: CountriesService) {
    this.countryService.currentCountry.subscribe(country => this.setCards(country));
  }

  setCards(country: any) {
    this.country = country;
    console.log(this.country);
    this.countrySelected = true;
    if (this.country && this.country.value && this.country.value.languages) {
      this.lang = Object.values(this.country.value.languages);
     } else {
      this.lang = [];
     }
     if (this.country && this.country.value && this.country.value.currencies) {
      this.currency = Object.values((this.country.value.currencies as Record<string, any>)).map((obj: Record<string, any>) => Object.values(obj)[0]);
     } else {
      this.currency = [];
     }
    this.currency = Object.values(this.country.value.currencies);
    this.capital = this.country.value.capital;
    this.population = new Intl.NumberFormat('en-us').format(this.country.value.population);
    console.log(this.lang);
    console.log(this.currency);
    console.log(this.capital);
    console.log(this.population);
  }
}

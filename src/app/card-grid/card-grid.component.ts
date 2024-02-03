import { Component } from '@angular/core';
import { CountriesService } from '../countries.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss']
})
export class CardGridComponent {

country: any = {};
lang!: string[];
currency!: any;
capital!: object;
population!: string;
commonName!: string;
countrySelected = false;
mapsAPIKey = environment.mapsAPIKey;

  constructor(private countryService: CountriesService, private sanitizer: DomSanitizer) {
    this.countryService.currentCountry.subscribe(country => this.setCards(country));
  }

  setCards(country: any) {
    this.country = country;
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
    this.commonName = this.country.value.name.common;
    console.log(this.country);
  }

  getMapsUrl() {
    const url = 'https://www.google.com/maps/embed/v1/place?key=' + this.mapsAPIKey + '&q=' + this.commonName;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }

   getWikiLangUrl() {
    const url = 'https://www.wikipedia.org/wiki/' + this.lang[0];
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }

   getWikiCapUrl() {
    const url = 'https://www.wikipedia.org/wiki/' + this.capital;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }
}

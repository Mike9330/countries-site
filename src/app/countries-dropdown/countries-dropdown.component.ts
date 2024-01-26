import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CountriesService } from '../countries.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-countries-dropdown',
  templateUrl: './countries-dropdown.component.html',
  styleUrls: ['./countries-dropdown.component.scss']
 })
export class CountriesDropdownComponent implements OnDestroy {
 private destroy$ = new Subject<void>();
  listOfCountries: any[] = [];
value: any;

@Output() emitCountries = new EventEmitter<any>();

 constructor(private countryService: CountriesService) {}

 countries: any[] = [];

 ngOnInit(){
  this.getCountries();
 }

 getCountries() {
  this.countryService.getCountries().subscribe(data => {
    this.countries = data;
    this.countries = this.countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
   });
 }

 countryChosen(country: any){
  this.countryService.changeCountry(country);
 }

 ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
 }
}
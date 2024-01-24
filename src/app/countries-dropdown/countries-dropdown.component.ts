import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CountriesService } from '../countries.service';


@Component({
  selector: 'app-countries-dropdown',
  templateUrl: './countries-dropdown.component.html',
  styleUrls: ['./countries-dropdown.component.scss']
 })
export class CountriesDropdownComponent implements OnDestroy {
 private destroy$ = new Subject<void>();
  listOfCountries: any[] = [];
value: any;

 constructor(private countryService: CountriesService) {}

 countries: any[] = [];

 ngOnInit(){
  this.getCountries();
 }

 getCountries() {
  this.countryService.getCountries().subscribe(data => {
    this.countries = data;
    console.log(this.countries);
   });
 }

 ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
 }
}
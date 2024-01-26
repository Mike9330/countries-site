import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class CountriesService {
 baseURL = 'https://restcountries.com/v3.1';
 private countrySource = new Subject<any>();
 currentCountry = this.countrySource.asObservable();


 constructor(private http: HttpClient) {}

 getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL + '/all');
 }

 changeCountry(country: any) {
   this.countrySource.next(country);
 }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap, } from 'rxjs';
import { Country, Languages } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion: {region: '', countries: []},
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  private saveTolLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      // tap( countries => console.log('Pasó por el tap', countries)),
      // map( countries => [])
      catchError( error => of([]) ), //se captura el error y se devuelve un objeto vacío, el of es importante
      //delay(2000), // este delay es solo para simular que tarda y poner un loading en pantalla, borrado al crear el debounce
    ); // para usar funciones de rxjs (revisad el pdf);
  }

  searchCountryByAlphaCode( code: string): Observable<Country | null>{
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError( error => of(null) ) //se captura el error y se devuelve un objeto vacío, el of es importante
    ); // para usar funciones de rxjs (revisad el pdf)
}

  searchCapital( term: string): Observable<Country[]>{
      const url = `${this.apiUrl}/capital/${term}`;
      return this.getCountriesRequest(url)
              .pipe(
                tap( countries => this.cacheStore.byCapital = {term: term, countries: countries}),
                tap(() => this.saveTolLocalStorage())
              );
  }

  searchCountry(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap( countries => this.cacheStore.byCountries = {term: term, countries: countries}),
      tap(() => this.saveTolLocalStorage())
    );
  }

  searchRegion(region: Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap( countries => this.cacheStore.byRegion = {region: region, countries: countries}),
      tap(() => this.saveTolLocalStorage())
    );
  }
}

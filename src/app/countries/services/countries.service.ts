import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, } from 'rxjs';
import { Country, Languages } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

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
      return this.http.get<Country[]>(url)
      .pipe(
        // tap( countries => console.log('Pasó por el tap', countries)),
        // map( countries => [])
        catchError( error => of([]) ) //se captura el error y se devuelve un objeto vacío, el of es importante
      ); // para usar funciones de rxjs (revisad el pdf)
  }

  searchCountry(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      // tap( countries => console.log('Pasó por el tap', countries)),
      // map( countries => [])
      catchError( error => of([]) ) //se captura el error y se devuelve un objeto vacío, el of es importante
    ); // para usar funciones de rxjs (revisad el pdf)
  }

  searchRegion(region: string): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url)
    .pipe(
      // tap( countries => console.log('Pasó por el tap', countries)),
      // map( countries => [])
      catchError( error => of([]) ) //se captura el error y se devuelve un objeto vacío, el of es importante
    ); // para usar funciones de rxjs (revisad el pdf)
  }
}

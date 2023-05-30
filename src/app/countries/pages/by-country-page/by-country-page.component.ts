import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';



@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries : Country[] = [];
  public initialValue: string = '';

  constructor(private countriesService: CountriesService){

  }
  ngOnInit(): void {
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
    this.countries = this.countriesService.cacheStore.byCountries.countries;
  }

  searchByCountry(term : string):void {
    this.countriesService.searchCountry(term)
    .subscribe( countries => {
        this.countries = countries;
    })
  }
}

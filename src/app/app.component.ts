import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meteo';
  response: string;
  newResponse: string;
  weather;
  brrrrrrrrrr;
  insee: string;
  temperature: string;

  constructor() {

    this.getInsee();
  }
  getInsee() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://api.meteo-concept.com/api/location/cities?token=6c7306a6ca056ad39e4b0c5cbbb09e1a258b9b2306ddcfd476041fac86acae5c&search=Paris');
    request.responseType = 'text';
    request.onload = () => {
      this.response = request.response;
      this.weather = JSON.parse(this.response);
      this.insee = this.weather.cities[0].insee;

      this.getTemperature();
    };

    request.send();
  }

  getTemperature() {
    const query = new XMLHttpRequest();
    query.open('GET', 'https://api.meteo-concept.com/api/forecast/nextHours?token=6c7306a6ca056ad39e4b0c5cbbb09e1a258b9b2306ddcfd476041fac86acae5c&insee=' + this.insee);
    query.responseType = 'text';
    query.onload = () => {
      this.newResponse = query.response;
      this.brrrrrrrrrr = JSON.parse(this.newResponse);
      this.temperature = this.brrrrrrrrrr.forecast[0].temp2m;
    };

    query.send();
  }

}


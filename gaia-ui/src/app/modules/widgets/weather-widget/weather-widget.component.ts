import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})

export class WeatherWidgetComponent implements OnInit {
  WeatherData:any;

  constructor() { }

  ngOnInit() {
    this.WeatherData = {
      main: {},
      isDay: true,
    };

    this.getWeatherData();
  }

  getWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Stuttgart,DE&appid=8a01aa4a89f53449a48a9d53041b1456')
      .then((response) => response.json())
      .then((data) => { this.setWeatherData(data); });
  }

  setWeatherData(data) {
    console.log(data);
    this.WeatherData = data;
    const sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    const currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }
}

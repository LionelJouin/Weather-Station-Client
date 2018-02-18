import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StationService } from '../shared/services/station.service';
import { Station } from '../../shared/models/station';
import { WeatherDataService } from '../shared/services/weather-data.service';
import { WeatherData } from '../../shared/models/weather-data';
import { and } from '@angular/router/src/utils/collection';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-station-data',
  templateUrl: './station-data.component.html',
  styleUrls: ['./station-data.component.css']
})
export class StationDataComponent implements OnInit {

  station: Station;
  weatherData: WeatherData[];
  //temperatures: object[];
  dataSensor: object;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private stationService: StationService,
    private weatherDataService: WeatherDataService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataSensor = {};
    this.getStation();

    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'apples',
          data: [12, 19, 3, 17, 6, 3, 7],
          backgroundColor: "rgba(153,255,51,0.6)"
        }, {
          label: 'oranges',
          data: [2, 29, 5, 5, 2, 3, 10],
          backgroundColor: "rgba(255,153,0,0.6)"
        }]
      }
    });
  }

  getStation(): void {
    this.stationService.getById(this.id)
      .subscribe(stations => (
        this.station = stations,
        this.getData(10)
      ));
  }

  getData(limit: number): void {
    this.weatherDataService.getByStationId(this.id, limit)
      .subscribe(weatherData => this.setData(weatherData));
  }

  setData(weatherData): void {
    this.weatherData = weatherData;

    for (var i = 0; i < this.station.sensors.length; i++) {

      let data = weatherData.map(
        data => ({
          [this.station.sensors[i].name]: data.data[this.station.sensors[i].name],
          createdOn: data.createdOn,
          updatedOn: data.updatedOn
        }));

      this.dataSensor[this.station.sensors[i].name] = data;

    }
  }

}

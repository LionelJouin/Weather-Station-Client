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
  dataSensor: object;
  id: string;

  lineChartLabels: any[];
  public lineChartColors: any[] = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartOptions: any = {
    responsive: true
  };
  lineChartLegend: boolean = true;
  lineChartType: string = 'line';

  constructor(
    private route: ActivatedRoute,
    private stationService: StationService,
    private weatherDataService: WeatherDataService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataSensor = {};
    this.getStation();
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

    this.lineChartLabels = weatherData.map(
      data => data.createdOn
    );

    for (var i = 0; i < this.station.sensors.length; i++) {

      let dataTemp = [{
        data: [],
        label: this.station.sensors[i].name
      }];
      dataTemp[0].data = weatherData.map(
        data => data.data[this.station.sensors[i].name]
      );

      this.dataSensor[this.station.sensors[i].name] = dataTemp;

    }
  }

}

import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StationService } from '../shared/services/station.service';
import { Station } from '../../shared/models/station';
import { WeatherDataService } from '../shared/services/weather-data.service';
import { WeatherData } from '../../shared/models/weather-data';
import { and } from '@angular/router/src/utils/collection';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-station-data',
  templateUrl: './station-data.component.html',
  styleUrls: ['./station-data.component.css']
})
export class StationDataComponent implements OnInit {

  private numberOfData = 10;
  private interval = 5; // interval in seconde
  private timeTemplate = "MM/DD/YYYY h:mm";

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  station: Station;
  weatherData: WeatherData[];
  lastWeatherData: any[];
  dataSensor: object;
  id: string;

  lineChartLabels: any[];
  lineChartColors: any[] = [
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
    responsive: true,
    scales:
      {
        xAxes: [{
          display: false
        }]
      },
    tooltips: {
      mode: 'index',
      intersect: false
    }
  };
  lineChartLegend: boolean = false;
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

    Observable.interval(this.interval * 1000).subscribe(x => {
      this.getLastData();
    });
  }

  getStation(): void {
    this.stationService.getById(this.id)
      .subscribe(stations => (
        this.station = stations,
        this.getData(this.numberOfData)
      ));
  }

  getData(limit: number): void {
    this.weatherDataService.getByStationId(this.id, limit)
      .subscribe(weatherData => this.setData(weatherData));
  }

  getLastData(): void {
    this.weatherDataService.getLastByStationId(this.id)
      .subscribe(weatherData => this.addLastData(weatherData));
  }

  private addLastData(weatherData: WeatherData): void {
    if (weatherData.updatedOn == this.weatherData.slice(-1)[0].updatedOn)
      return;

    this.setLastData(weatherData);

    weatherData.data.createdOn = moment(weatherData.data.createdOn).format(this.timeTemplate);

    this.weatherData.push(weatherData);
    this.weatherData.shift();
    this.lineChartLabels.push(weatherData.data.createdOn);
    this.lineChartLabels.shift();

    for (var i = 0; i < this.station.sensors.length; i++) {
      this.dataSensor[this.station.sensors[i].name][0].data.push(weatherData.data[this.station.sensors[i].name]);
      this.dataSensor[this.station.sensors[i].name][0].data.shift();
    }

    this.charts.forEach((child) => {
      child.chart.update();
    });
  }

  private setData(weatherData: WeatherData[]): void {
    this.weatherData = weatherData.sort(this.dateSortAsc);
    this.weatherData.map(x => x.createdOn = moment(x.createdOn).format(this.timeTemplate));

    this.setLastData(this.weatherData.slice(-1)[0]);

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

  private setLastData(weatherData): void {
    var j = -1;
    var k = 1;
    this.lastWeatherData = [];
    for (var i = 0; i < this.station.sensors.length; i++) {
      if (i % 4 == 0) {
        j++;
      }
      if (i % 4 == 0)
        this.lastWeatherData.push([]);
      if (i % 2 == 0) {
        this.lastWeatherData[j].push([]);
        k = (k == 0) ? 1 : 0;
      }
      this.lastWeatherData[j][k].push(
        {
          data: weatherData.data[this.station.sensors[i].name],
          type: this.station.sensors[i].name
        }
      );
    }
  }

  filterDataSensor() {
    if (this.station == undefined)
      return [];
    return this.station.sensors.filter(x => this.dataSensor[x.name] != undefined)
  }

  private dateSortAsc(b, a): number {
    if (new Date(a.createdOn) > new Date(b.createdOn)) return -1;
    if (new Date(a.createdOn) < new Date(b.createdOn)) return 1;
    return 0;
  };

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api.service';
import { WeatherData } from '../../../shared/models/weather-data';

@Injectable()
export class WeatherDataService {

  constructor(
    private apiService: ApiService
  ) { }

  getByStationId(idStation: string, limit: number): Observable<WeatherData[]> {
    return this.apiService.get('/weatherdata?filter[where][stationId]='
      + idStation + "&filter[limit]=" + limit + "&filter[order]=createdOn DESC")
      .pipe(map(data => data));
  }

  getLastByStationId(idStation: string): Observable<WeatherData> {
    return this.apiService.get('/weatherdata/findone?filter[where][stationId]='
      + idStation + "&filter[order]=createdOn DESC")
      .pipe(map(data => data));
  }

}

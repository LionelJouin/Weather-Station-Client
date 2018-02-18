import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
      + idStation + "&filter[limit]=" + limit)
      .pipe(map(data => data));
  }

}

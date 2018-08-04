import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { Station } from '../../../shared/models/station';

import { map } from 'rxjs/operators';

@Injectable()
export class StationService {

  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<Station[]> {
    return this.apiService.get('/station')
      .pipe(map(data => data));
  }

  getById(id: string): Observable<Station> {
    return this.apiService.get('/station/' + id + "?filter[include]=sensors")
      .pipe(map(data => data));
  }

  create(weatherStation: Station): Observable<Station> {
    return this.apiService.post('/station/', weatherStation)
      .pipe(map(data => data));
  }

  update(weatherStation: Station): Observable<Station> {
    return this.apiService.put('/station/', weatherStation)
      .pipe(map(data => data));
  }

  remove(id: string): Observable<Station> {
    return this.apiService.delete('/station/' + id)
      .pipe(map(data => data));
  }

  addSensor(id: string, idSensor: string): Observable<Station> {
    return this.apiService.put('/station/' + id + '/sensors/rel/' + idSensor)
      .pipe(map(data => data));
  }

  removeSensor(id: string, idSensor: string): Observable<Station> {
    return this.apiService.delete('/station/' + id + '/sensors/rel/' + idSensor)
      .pipe(map(data => data));
  }

}

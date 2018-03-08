import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs/Observable';
import { Sensor } from '../../../shared/models/sensor';

import { map } from 'rxjs/operators';

@Injectable()
export class SensorService {

  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<Sensor[]> {
    return this.apiService.get('/sensor')
      .pipe(map(data => data));
  }

  create(sensor: Sensor): Observable<Sensor> {
    return this.apiService.post('/sensor/', sensor)
      .pipe(map(data => data));
  }

  update(sensor: Sensor): Observable<Sensor> {
    return this.apiService.put('/sensor/', sensor)
      .pipe(map(data => data));
  }

  remove(id: string): Observable<any> {
    return this.apiService.delete('/sensor/' + id)
      .pipe(map(data => data));
  }

}

import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs/Observable';
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
    return this.apiService.get('/station/' + id+"?filter[include]=sensors")
    .pipe(map(data => data));
  }

}

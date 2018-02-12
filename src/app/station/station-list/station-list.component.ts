import { Component, OnInit } from '@angular/core';
import { StationService } from '../shared/services/station.service';
import { Station } from '../../shared/models/station';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {

  stations: Station[];

  constructor(private stationService: StationService) { }

  ngOnInit() {
    this.getAllStations();
  }

  getAllStations(): void {
    this.stationService.getAll()
      .subscribe(stations => this.stations = stations);
  }

}

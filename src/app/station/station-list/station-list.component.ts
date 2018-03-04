import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StationService } from '../shared/services/station.service';
import { Station } from '../../shared/models/station';
import { StationCreateDialogComponent } from '../station-create-dialog/station-create-dialog.component';


@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {

  stations: Station[];

  constructor(
    private stationService: StationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllStations();
  }

  getAllStations(): void {
    this.stationService.getAll()
      .subscribe(stations => this.stations = stations);
  }

  openStationCreateDialog(): void {
    let dialogRef = this.dialog.open(StationCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllStations();
    });
  }

}

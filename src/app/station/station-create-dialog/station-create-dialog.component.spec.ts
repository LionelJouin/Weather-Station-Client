import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationCreateDialogComponent } from './station-create-dialog.component';

describe('StationCreateDialogComponent', () => {
  let component: StationCreateDialogComponent;
  let fixture: ComponentFixture<StationCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

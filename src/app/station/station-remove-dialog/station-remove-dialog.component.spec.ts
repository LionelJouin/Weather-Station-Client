import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationRemoveDialogComponent } from './station-remove-dialog.component';

describe('StationRemoveDialogComponent', () => {
  let component: StationRemoveDialogComponent;
  let fixture: ComponentFixture<StationRemoveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationRemoveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

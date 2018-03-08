import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorRemoveDialogComponent } from './sensor-remove-dialog.component';

describe('SensorRemoveDialogComponent', () => {
  let component: SensorRemoveDialogComponent;
  let fixture: ComponentFixture<SensorRemoveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorRemoveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDataComponent } from './station-data.component';

describe('StationDataComponent', () => {
  let component: StationDataComponent;
  let fixture: ComponentFixture<StationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

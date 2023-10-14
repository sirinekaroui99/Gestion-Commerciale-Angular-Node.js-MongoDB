import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteInfoComponent } from './boite-info.component';

describe('BoiteInfoComponent', () => {
  let component: BoiteInfoComponent;
  let fixture: ComponentFixture<BoiteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoiteInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

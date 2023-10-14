import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteAjoutClientComponent } from './boite-ajout-client.component';

describe('BoiteAjoutClientComponent', () => {
  let component: BoiteAjoutClientComponent;
  let fixture: ComponentFixture<BoiteAjoutClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoiteAjoutClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteAjoutClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

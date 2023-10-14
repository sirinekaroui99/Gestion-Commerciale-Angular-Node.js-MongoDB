import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteAjoutCommandeComponent } from './boite-ajout-commande.component';

describe('BoiteAjoutCommandeComponent', () => {
  let component: BoiteAjoutCommandeComponent;
  let fixture: ComponentFixture<BoiteAjoutCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoiteAjoutCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteAjoutCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimerCommandeComponent } from './imprimer-commande.component';

describe('ImprimerCommandeComponent', () => {
  let component: ImprimerCommandeComponent;
  let fixture: ComponentFixture<ImprimerCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimerCommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimerCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

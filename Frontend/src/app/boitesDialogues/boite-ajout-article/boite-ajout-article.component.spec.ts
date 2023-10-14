import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteAjoutArticleComponent } from './boite-ajout-article.component';

describe('BoiteAjoutArticleComponent', () => {
  let component: BoiteAjoutArticleComponent;
  let fixture: ComponentFixture<BoiteAjoutArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoiteAjoutArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteAjoutArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

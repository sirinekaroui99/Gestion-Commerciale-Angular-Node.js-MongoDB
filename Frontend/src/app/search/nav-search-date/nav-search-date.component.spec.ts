import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSearchDateComponent } from './nav-search-date.component';

describe('NavSearchDateComponent', () => {
  let component: NavSearchDateComponent;
  let fixture: ComponentFixture<NavSearchDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavSearchDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSearchDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

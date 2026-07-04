import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plats } from './plats';

describe('Plats', () => {
  let component: Plats;
  let fixture: ComponentFixture<Plats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plats],
    }).compileComponents();

    fixture = TestBed.createComponent(Plats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMain } from './nav-main';

describe('NavMain', () => {
  let component: NavMain;
  let fixture: ComponentFixture<NavMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

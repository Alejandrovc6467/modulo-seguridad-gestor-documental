import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinaspermiososComponent } from './oficinaspermiosos.component';

describe('OficinaspermiososComponent', () => {
  let component: OficinaspermiososComponent;
  let fixture: ComponentFixture<OficinaspermiososComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OficinaspermiososComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OficinaspermiososComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

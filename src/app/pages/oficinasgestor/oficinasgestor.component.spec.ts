import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficinasgestorComponent } from './oficinasgestor.component';

describe('OficinasgestorComponent', () => {
  let component: OficinasgestorComponent;
  let fixture: ComponentFixture<OficinasgestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OficinasgestorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OficinasgestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

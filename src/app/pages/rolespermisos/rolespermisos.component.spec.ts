import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolespermisosComponent } from './rolespermisos.component';

describe('RolespermisosComponent', () => {
  let component: RolespermisosComponent;
  let fixture: ComponentFixture<RolespermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolespermisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolespermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

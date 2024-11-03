import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariooficinaComponent } from './usuariooficina.component';

describe('UsuariooficinaComponent', () => {
  let component: UsuariooficinaComponent;
  let fixture: ComponentFixture<UsuariooficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariooficinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariooficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

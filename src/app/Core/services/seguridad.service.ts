import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  estaLogueado(){
    return true;
  }


  obtenerRol(): string{
    return "administradorw"
  }


}

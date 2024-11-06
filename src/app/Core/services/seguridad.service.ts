import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  estaLogueado(){
    //hacer lo de guradar la variabl en el sesion storage nada mas, esto si los datos ingresados son iguales a los  quemados que pongo que pongo aqui
    //ver el video 156 para eso
    return true;
  }


  obtenerRol(): string{
    return "administradorw"
  }


}

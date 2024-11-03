import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuarioOficinaDTO } from '../models/UsuarioOficinaDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuariooficinaService {

  private http = inject(HttpClient);
  private urlBase = "http://gestordocumental.somee.com/api/UsuarioOficina";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion

  private AsignarUsuarioAOficina = "http://gestordocumental.somee.com/api/UsuarioOficina/AsignarUsuarioAOficina";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion

  private RemoverUsuarioAOficina = "http://gestordocumental.somee.com/api/UsuarioOficina/RemoverUsuarioAOficina";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion


  constructor() { }


  public obtenerUsuariosOficinas(): Observable<usuarioOficinaDTO[]>{
    return this.http.get<usuarioOficinaDTO[]> (this.urlBase);
  }


  public crearUsuarioOficina(permisoRol: usuarioOficinaDTO){
    return this.http.post(this.AsignarUsuarioAOficina, permisoRol);
  }



  public eliminarUsuarioOficina(permisoRol: usuarioOficinaDTO){
    return this.http.post(this.RemoverUsuarioAOficina, permisoRol);
  }
  
}
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioNormaDTO } from '../models/UsuarioNormaDTO';
@Injectable({
  providedIn: 'root'
})
export class UsuarionormaService {

 
  private http = inject(HttpClient);
  private urlBase = "http://gestordocumental.somee.com/api/NormaUsuario";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion
  private urlAsignarNormaUsuario = "http://gestordocumental.somee.com/api/NormaUsuario/AsignarNormaUsuario";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion
  private urlEliminarNormaUsuario = "http://gestordocumental.somee.com/api/NormaUsuario/EliminarNormaUsuario";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion


  constructor() { }


  public obtenerUsuariosNormas(): Observable<UsuarioNormaDTO[]>{
    return this.http.get<UsuarioNormaDTO[]> (this.urlBase);
  }

  public obtenerCategoriaPorId(id:number): Observable<UsuarioNormaDTO>{
    return this.http.get<UsuarioNormaDTO>(`${this.urlBase}/${id}`);
  }
  public crearUsuarioNorma(usuarioNorma: UsuarioNormaDTO){
    return this.http.post(this.urlAsignarNormaUsuario, usuarioNorma);
  }

  public eliminarUsuarioNorma(usuarioNorma: UsuarioNormaDTO){
    return this.http.post(this.urlEliminarNormaUsuario, usuarioNorma);
  }





}
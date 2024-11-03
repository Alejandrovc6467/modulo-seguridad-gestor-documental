import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PermisoRolDTO } from '../models/PermisoRolDTO';

@Injectable({
  providedIn: 'root'
})
export class PermisorolService {
  private http = inject(HttpClient);
  private urlBase = "http://gestordocumental.somee.com/api/PermisoRol";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion

  private urlAsignarPerisorol = "http://gestordocumental.somee.com/api/PermisoRol/AsignarPermisoARol";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion

  private urlRemoverPerisorol = "http://gestordocumental.somee.com/api/PermisoRol/RemoverPermisoARol";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion


  constructor() { }


  public obtenerPermisoRol(): Observable<PermisoRolDTO[]>{
    return this.http.get<PermisoRolDTO[]> (this.urlBase);
  }

  public obtenerOficinaPorId(id:number): Observable<PermisoRolDTO>{
    return this.http.get<PermisoRolDTO>(`${this.urlBase}/${id}`);
  }
  public crearPermisoRol(permisoRol: PermisoRolDTO){
    return this.http.post(this.urlAsignarPerisorol, permisoRol);
  }

  public actualizarOficina(oficina: PermisoRolDTO){
    return this.http.put(this.urlBase, oficina);
  }

  public eliminarPermisoRol(permisoRol: PermisoRolDTO){
    return this.http.post(this.urlRemoverPerisorol, permisoRol);
  }
  
}

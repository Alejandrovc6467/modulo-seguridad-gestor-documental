import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PermisoOficinaDTO } from '../models/PermisoOficinaDTO';
@Injectable({
  providedIn: 'root'
})
export class PermisooficinaService {
  private http = inject(HttpClient);
  private urlBase = "http://gestordocumental.somee.com/api/PermisoOficina";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion

  private urlAsignarPermisoAOfina = "http://gestordocumental.somee.com/api/PermisoOficina/AsignarPermisoAOficina";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion

  private urlRemoverPermisoAOfina = "http://gestordocumental.somee.com/api/PermisoOficina/RemoverPermisoAOficina";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion


  constructor() { }


  public obtenerPermisosOfinas(): Observable<PermisoOficinaDTO[]>{
    return this.http.get<PermisoOficinaDTO[]> (this.urlBase);
  }

  public obtenerOficinaPorId(id:number): Observable<PermisoOficinaDTO>{
    return this.http.get<PermisoOficinaDTO>(`${this.urlBase}/${id}`);
  }
  public crearPermisoOficina(permisoRol: PermisoOficinaDTO){
    return this.http.post(this.urlAsignarPermisoAOfina, permisoRol);
  }

  public actualizarOficina(oficina: PermisoOficinaDTO){
    return this.http.put(this.urlBase, oficina);
  }

  public eliminarPermisoOficina(permisoOficina: PermisoOficinaDTO){
    return this.http.post(this.urlRemoverPermisoAOfina, permisoOficina);
  }
  
}

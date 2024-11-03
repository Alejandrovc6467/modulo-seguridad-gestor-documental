import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OficinaGestorIdsDTO } from '../models/OficinaGestorIdsDTO';

@Injectable({
  providedIn: 'root'
})
export class OficinasgestoridsService {

  private http = inject(HttpClient);
  private urlBase = "http://gestordocumental.somee.com/api/OficinaGestor";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion

  private urlAsignarOficinaGestor = "http://gestordocumental.somee.com/api/OficinaGestor/AsignarOficinaGestor";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion

  private urlRemoverOficinaGestor= "http://gestordocumental.somee.com/api/OficinaGestor/RemoverOficinaGestor";// esto se haria mas profesional creando un enviroment, que son ambiemtes de desarrolo uno para pruebas y otro para produccion


  constructor() { }


  public obtenerOficinasGestoresIds(): Observable<OficinaGestorIdsDTO[]>{
    return this.http.get<OficinaGestorIdsDTO[]> (this.urlBase);
  }

  public obtenerNormasPorId(id:number): Observable<OficinaGestorIdsDTO>{
    return this.http.get<OficinaGestorIdsDTO>(`${this.urlBase}/${id}`);
  }
  public crearOficinaGestor(oficinaGestorIdsDTO: OficinaGestorIdsDTO){
    return this.http.post(this.urlAsignarOficinaGestor, oficinaGestorIdsDTO);
  }

  public actualizarNorma(oficinaGestorIdsDTO: OficinaGestorIdsDTO){
    return this.http.put(this.urlBase, oficinaGestorIdsDTO);
  }

  public eliminarOficinaGestor(id:number){
    return this.http.delete(`${this.urlRemoverOficinaGestor}/${id}`);
  }

}
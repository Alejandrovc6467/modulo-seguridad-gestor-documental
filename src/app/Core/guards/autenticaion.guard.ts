import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SeguridadService } from '../services/seguridad.service';


export const autenticaionGuard: CanActivateFn = (route, state) => {

  //este es un unico guard para validar que si ya esta logueado y se encuentra en una pagina y por algun motivo pone la url del loggin
  // lo devuelva directamente a usuarios que es la pagina principal, ya que no tiene sentodo que este logeado y navegue por el login

  const seguridadService = inject(SeguridadService);
  const router = inject(Router);


  //quitar P  este es solo para pruebas
  if(seguridadService.isAuthenticatedP()){
    return router.navigate(['/usuarios']);
  }else{
    return true;
  }


};

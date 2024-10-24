import { Routes } from '@angular/router';


import { OficinasComponent } from './pages/oficinas/oficinas.component';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { IniciosesionprincipalComponent } from './pages/iniciosesionprincipal/iniciosesionprincipal.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';




export const routes: Routes = [

    //inicie en Consultas por default
    {path:'', component:UsuariosComponent},

   

    
    {path: 'oficinas', component:OficinasComponent},
    {path: 'usuarios', component:UsuariosComponent},
 



    
    {path: 'pruebas', component:PruebaComponent},



    {path: 'iniciosesionprincipal', component:IniciosesionprincipalComponent},
    //si la ruta  no existe redirecciona a consultas
    {path: '**', component:UsuariosComponent},
  


];

// el path ** siempre debe de ir al final, ya que si va al principio pues no importa la ruta que pongas siempre entrara en **, porque lee desde arriba
// enotnces por eso hay que ponerla al fondo, porque si no encuentra nada entre al **
// con {path '**', redirecTo: ''} lo redireccion a la raiz, como lo tengo pues lo envio a un componente, podria crearme uno de 404 no fount, pero mas adelante

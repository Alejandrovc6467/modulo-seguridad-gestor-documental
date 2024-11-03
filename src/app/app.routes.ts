import { Routes } from '@angular/router';


import { OficinasComponent } from './pages/oficinas/oficinas.component';

import { IniciosesionprincipalComponent } from './pages/iniciosesionprincipal/iniciosesionprincipal.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UsuarionormaComponent } from './pages/usuarionorma/usuarionorma.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { RolespermisosComponent } from './pages/rolespermisos/rolespermisos.component';
import { OficinaspermiososComponent } from './pages/oficinaspermiosos/oficinaspermiosos.component';
import { OficinasgestorComponent } from './pages/oficinasgestor/oficinasgestor.component';
import { UsuariooficinaComponent } from './pages/usuariooficina/usuariooficina.component';




export const routes: Routes = [

    //inicie en Consultas por default
    {path:'', component:UsuariosComponent},

   

    
    {path: 'oficinas', component:OficinasComponent},
    {path: 'oficinaspermisos', component:OficinaspermiososComponent},
    {path: 'oficinasgestor', component:OficinasgestorComponent},
    {path: 'usuarios', component:UsuariosComponent},
    {path: 'usuarionorma', component:UsuarionormaComponent},
    {path: 'usuariOficina', component:UsuariooficinaComponent},
    {path: 'roles', component:RolesComponent},
    {path: 'rolespermisos', component:RolespermisosComponent},
    {path: 'permisos', component:PermisosComponent},
 




    {path: 'iniciosesionprincipal', component:IniciosesionprincipalComponent},
    //si la ruta  no existe redirecciona a consultas
    {path: '**', component:UsuariosComponent},
  


];

// el path ** siempre debe de ir al final, ya que si va al principio pues no importa la ruta que pongas siempre entrara en **, porque lee desde arriba
// enotnces por eso hay que ponerla al fondo, porque si no encuentra nada entre al **
// con {path '**', redirecTo: ''} lo redireccion a la raiz, como lo tengo pues lo envio a un componente, podria crearme uno de 404 no fount, pero mas adelante

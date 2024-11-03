
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioDTO,UsuarioExtendidaDTO } from '../../Core/models/UsuarioDTO';
import { RolDTO } from '../../Core/models/RolDTO';
import { PermisoDTO } from '../../Core/models/PermisoDTO';
import { PermisorolService } from '../../Core/services/permisorol.service';
import { RolesService } from '../../Core/services/roles.service';
import { PermisosService } from '../../Core/services/permisos.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PermisoRolDTO, PermisoRolExtendidaDTO } from '../../Core/models/PermisoRolDTO';

@Component({
  selector: 'app-rolespermisos',
  standalone: true,
  imports: [CommonModule,MatButtonModule,  MatFormFieldModule, MatSelectModule,ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule],
  templateUrl: './rolespermisos.component.html',
  styleUrl: './rolespermisos.component.css'
})
export class RolespermisosComponent {

  
  permisorolService = inject(PermisorolService);
  rolService = inject(RolesService);
  permisoService = inject(PermisosService);
  listaUsuarios! : PermisoRolDTO[];
  roles!: RolDTO[];
  permisos!: PermisoDTO[];


  listaRolesPermisosDataSource = new MatTableDataSource<PermisoRolExtendidaDTO>([]);
  displayedColumns: string[] = [ 'acciones', 'rol', 'permiso'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  textoBuscar: string = "";
  estaEditando: boolean = false;
  usuarioSeleccinado!: UsuarioDTO | null;


  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerPermisos();
    this.obtenerCategoriasCargarTabla();
    this.formulario.updateValueAndValidity();
  }
  
  constructor(){}

  private formbuilder = inject(FormBuilder);
  formulario = this.formbuilder.group({
    rolID: [0, [Validators.required]],
    permisoID: [0, [Validators.required]],
  });

  obtenerRoles(){
    this.rolService.obtenerCategorias().subscribe(response => {
      this.roles = response;
  })};

  obtenerPermisos(){
    this.permisoService.obtenerCategorias().subscribe(response => {
      this.permisos = response;
  })};



  //CRUD **********************************************************
  obtenerUsuarios(){
    this.permisorolService.obtenerPermisoRol().subscribe(response => {
      this.listaUsuarios = response;
    });



  }



  crearUsuario(){
    
    if(this.formulario.invalid){
      alert("Formulario invalido");
    }else{

      const permisoRol = this.formulario.value as PermisoRolDTO; 
      
      // Asegurarse de que clasificacionId sea un número válido
      // permisoRol.clasificacionID = Number(permisoRol.clasificacionID);

      console.log(permisoRol);
  
      this.permisorolService.crearPermisoRol(permisoRol).subscribe(response => {

        console.log(response);
        if(response){
          this.obtenerCategoriasCargarTabla();
          this.formulario.reset();
          this.limpiarErroresFormulario();
          Swal.fire('Creado!', 'Se ha asignado el permiso al rol correctamente.', 'success');
        }else{
          Swal.fire('Error!', 'No se ha asignado el permiso al rol correctamente.', 'error');
        }
       
      
      });

    }
      
  
  }
  

 

  
  eliminarUsuario(element: any) {

    
    // Mostrar el SweetAlert para confirmar la eliminación
    Swal.fire({
        title: '¿Desea eliminar el PermisoRol?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
     
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, proceder con la eliminación
            this.permisorolService.eliminarPermisoRol(element).subscribe(response => {

             
                this.obtenerCategoriasCargarTabla();
                this.formulario.reset();
                this.limpiarErroresFormulario();
                Swal.fire('Creado!', 'Se ha eliminado el PermisoRol correctamente.', 'success');
             
             
            });
        }else{
          Swal.fire('Error!', 'El PermisoRol no ha sido eliminado.', 'error');
        }
    });

    
  }
    


  

  // Otros **********************************************************

  obtenerCategoriasCargarTabla(){
    this.permisorolService.obtenerPermisoRol().subscribe(response => {
      this.listaUsuarios = response;
      this.setTable(this.listaUsuarios);
    });
  }

  setTable(data:PermisoRolDTO[]){

    //voy simular una espera con este setTime
    setTimeout(() => {

      // Mapear los datos para agregar el nombre de la clasificación
      const dataConClasificacionNombre: PermisoRolExtendidaDTO[] = data.map(permisorol => {

        const rol = this.roles.find(rol => rol.id === permisorol.rolID);
        const permiso = this.permisos.find(permiso => permiso.id === permisorol.permisoID);
        return {
          ...permisorol,
          permisoNombre:permiso ? permiso.nombre : 'Sin nombre',
          rolNombre: rol ? rol.nombre : 'Sin rol'

        
        };
      });
      // Configurar el DataSource con los datos modificados
      this.listaRolesPermisosDataSource = new MatTableDataSource<PermisoRolExtendidaDTO>(dataConClasificacionNombre);
      this.listaRolesPermisosDataSource.paginator = this.paginator;

    }, 3000);
  }
  
  realizarBusqueda() {
    this.filtrarData();
  }

  filtrarData(){

    /*
    const data = this.listaUsuarios.slice();
    if(!this.textoBuscar){
     this.setTable(data);
      return;
    }

    const dataFiltrada = data.filter(item => {
      return item.permisoID.includes(this.textoBuscar);
    })

    this.setTable(dataFiltrada);
    */
  }

  limpiarFormulario() {
    this.formulario.reset(); // Resetea los campos del formulario
    this.formulario.markAsPristine();  // Marcar como 'pristino'
    this.formulario.markAsUntouched(); // Marcar como 'intacto'
    this.formulario.updateValueAndValidity(); // Recalcular estado de validez
    this.limpiarErroresFormulario(); // Eliminar los errores
  }
 
  onSearchChange(event: any) {
    const filterValue = event.target.value?.trim().toLowerCase() || '';
    if (!filterValue) {
      // Si esta vacio, mostrar toda la lista
      this.setTable(this.listaUsuarios);
      return;
    }
    //pude haber hecho todo el filtro aqui, pero se requeria la necesidad del boton buscar
  }


  // validaciones **********************************************************
  obtenerErrorDescripcion() {
    /*
    const descripcion = this.formulario.controls.descripcion;
    if (descripcion.hasError('required')) {
      return 'El campo descripción es obligatorio';
    }
    return '';
    */
  }

  obtenerErrorNombre(){
    /*
    const nombre = this.formulario.controls.nombre;
   
    if (nombre.hasError('required')) {
      return 'El campo nombre es obligatorio';
    }

    
    if (nombre.hasError('pattern')) {
      return 'El campo nombre solo puede contener letras';
    }
    
    return ''; 
    */
  }

  limpiarErroresFormulario() {
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.get(key)?.setErrors(null); // Eliminar los errores de cada control
    });
  }

  obtenerErrorClasificacionId() {
    /*
    const clasificacionId = this.formulario.controls.clasificacionID;
  
    if (clasificacionId.hasError('required')) {
      return 'El campo clasificación es obligatorio';
    }
  
    return '';
    */
  }

}


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
import { UsuariosService } from '../../Core/services/usuarios.service';
import { RolesService } from '../../Core/services/roles.service';
import { PermisosService } from '../../Core/services/permisos.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rolespermisos',
  standalone: true,
  imports: [CommonModule,MatButtonModule,  MatFormFieldModule, MatSelectModule,ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule],
  templateUrl: './rolespermisos.component.html',
  styleUrl: './rolespermisos.component.css'
})
export class RolespermisosComponent {

  
  usuariosService = inject(UsuariosService);
  rolService = inject(RolesService);
  permisoService = inject(PermisosService);
  listaUsuarios! : UsuarioDTO[];
  roles!: RolDTO[];
  permisos!: PermisoDTO[];


  listaUsuariosDataSource = new MatTableDataSource<UsuarioExtendidaDTO>([]);
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
    this.usuariosService.obtenerUsuarios().subscribe(response => {
      this.listaUsuarios = response;
    });



  }

  obtenerUsuarioPorId(idBuscar:number){
    //const idBuscar: number = 1;
    this.usuariosService.obtenerUsuarioPorId(idBuscar).subscribe(response => {
      console.log(response);
    });
  }

  crearUsuario(){
    
    if(this.formulario.invalid){
      alert("Formulario invalido");
    }else{

      const usuario = this.formulario.value as UsuarioDTO; 
      
      // Asegurarse de que clasificacionId sea un número válido
      // usuario.clasificacionID = Number(usuario.clasificacionID);

      console.log(usuario);
  
      this.usuariosService.crearUsuario(usuario).subscribe(response => {
        console.log(response);
        this.obtenerCategoriasCargarTabla();
        this.formulario.reset();
        this.limpiarErroresFormulario();
        Swal.fire('Creada!', 'La categoría ha sido creada.', 'success');
      });

    }
  
  }

  actualizarUsuario() {

    /*
    if (!this.usuarioSeleccinado) return;
      const usuarioActualizado: UsuarioDTO = {
        id: this.usuarioSeleccinado.id,
        nombre: this.formulario.value.nombre!,
        apellido: this.formulario.value.apellido!,
        correo: this.formulario.value.correo!,
        password: this.formulario.value.password!,
        rolID: this.formulario.value.rolID!,
        activo: true,
        eliminado: false
      };

      console.log(this.usuarioSeleccinado);
      this.usuariosService.actualizarUsuario(usuarioActualizado).subscribe(response => {
        console.log(response);
        this.obtenerCategoriasCargarTabla();
        this.cancelarEdicion();
        this.limpiarErroresFormulario();
        Swal.fire('Editada!', 'La categoría ha sido editada.', 'success');
      });

      */
      
  }


  editarUsuario(element: UsuarioDTO) {
    /*
    
    // Método para cargar los datos de la categoría seleccionada y activar el modo de edición
    this.estaEditando = true;
    this.usuarioSeleccinado = element;
    // Cargar los datos de la categoría en el formulario
    this.formulario.patchValue({
      nombre: element.nombre,
      apellido: element.apellido,
      correo: element.correo,
      password: element.password,
      rolID: element.rolID
    });
    this.limpiarErroresFormulario();
    
    */
  }

  cancelarEdicion() {
    this.estaEditando = false;
    this.usuarioSeleccinado = null;
    this.formulario.reset(); // Limpiar el formulario
    this.formulario.markAsPristine();  // Marcar como 'pristino'
    this.formulario.markAsUntouched(); // Marcar como 'intacto'
    this.formulario.updateValueAndValidity(); // Recalcular estado de validez
  }


  eliminarUsuario(idEliminar: number) {
    // Mostrar el SweetAlert para confirmar la eliminación
    Swal.fire({
        title: '¿Desea eliminar el Usuario?',
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
            this.usuariosService.eliminarUsuario(idEliminar).subscribe(response => {
                console.log(response);
                this.obtenerCategoriasCargarTabla();
                Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
            });
        }else{
          Swal.fire('Error!', 'El usuario no ha sido eliminado.', 'error');
        }
    });
  }


  

  // Otros **********************************************************

  obtenerCategoriasCargarTabla(){
    this.usuariosService.obtenerUsuarios().subscribe(response => {
      this.listaUsuarios = response;
      this.setTable(this.listaUsuarios);
    });
  }

  setTable(data:UsuarioDTO[]){

    //voy simular una espera con este setTime
    setTimeout(() => {

      // Mapear los datos para agregar el nombre de la clasificación
      const dataConClasificacionNombre: UsuarioExtendidaDTO[] = data.map(usuario => {

        const rol = this.roles.find(rol => rol.id === usuario.rolID);
        return {
          ...usuario,
          rolNombre: rol ? rol.nombre : 'Sin rol'
        };
      });
      // Configurar el DataSource con los datos modificados
      this.listaUsuariosDataSource = new MatTableDataSource<UsuarioExtendidaDTO>(dataConClasificacionNombre);
      this.listaUsuariosDataSource.paginator = this.paginator;

    }, 3000);
  }
  
  realizarBusqueda() {
    this.filtrarData();
  }

  filtrarData(){

    const data = this.listaUsuarios.slice();
    if(!this.textoBuscar){
     this.setTable(data);
      return;
    }

    const dataFiltrada = data.filter(item => {
      return item.nombre.includes(this.textoBuscar);
    })

    this.setTable(dataFiltrada);
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

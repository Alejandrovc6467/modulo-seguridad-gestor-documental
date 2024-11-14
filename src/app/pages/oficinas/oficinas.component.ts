
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioDTO,UsuarioExtendidaDTO } from '../../Core/models/UsuarioDTO';
import { RolDTO } from '../../Core/models/RolDTO';
import { OficinasService } from '../../Core/services/oficinas.service';
import { OficinasgestorasService } from '../../Core/services/oficinasgestoras.service';
import { OficinasgestoridsService } from '../../Core/services/oficinasgestorids.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OficinaGestorDTO, OficinaGestorExtendidaDTO } from '../../Core/models/OficinaGestorDTO';
import { OficinaDTO } from '../../Core/models/OficinaDTO';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { OficinaGestorIdsDTO } from '../../Core/models/OficinaGestorIdsDTO';
import { CustomMatPaginatorIntlComponent } from '../../Core/Componentes/custom-mat-paginator-intl/custom-mat-paginator-intl.component';




@Component({
  selector: 'app-oficinas',
  standalone: true,
  imports: [CommonModule,MatButtonModule,  MatFormFieldModule, MatSelectModule,ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule,MatCheckboxModule, MatRadioModule],
  templateUrl: './oficinas.component.html',
  styleUrl: './oficinas.component.css',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlComponent }
  ]
})
export class OficinasComponent {

 
  oficinasService = inject(OficinasService);
  oficinasgestorasService = inject(OficinasgestorasService);
  oficinasgestoridsService = inject(OficinasgestoridsService);
  listaOficinas! : OficinaDTO[];
  oficinasGestoras!: OficinaGestorDTO[];
  oficinasGestorasIds!: OficinaGestorIdsDTO[];


  listaOficinasdataSource = new MatTableDataSource<OficinaDTO>([]);
  displayedColumns: string[] = [ 'acciones', 'nombre', 'codigoOficina', 'gestor' ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  textoBuscar: string = "";
  estaEditando: boolean = false;
  usuarioSeleccinado!: UsuarioDTO | null;


  ngOnInit(): void {

    this.obtenerOficinas();
    this.obtenerCategoriasCargarTabla();
    this.formulario.updateValueAndValidity();
  }
  
  constructor(){}

  private formbuilder = inject(FormBuilder);
  formulario = this.formbuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
    codigoOficina: ['', [Validators.required]],
    gestor: false
  });


  obtenerOficinas(){
    this.oficinasService.obtenerOficinas().subscribe(response => {
      this.listaOficinas = response;
  })};




  //CRUD **********************************************************
  obtenerUsuarios(){
    this.oficinasService.obtenerOficinas().subscribe(response => {
      this.listaOficinas = response;
    });
  }

  crearOficina(){
    
    if(this.formulario.invalid){
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas crear la oficina?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {


        const oficina = this.formulario.value as OficinaDTO; 
   
      console.log(oficina);
  
      this.oficinasService.crearOficina(oficina).subscribe(response => {
          console.log(response);
          this.obtenerCategoriasCargarTabla();
          this.formulario.reset();
          this.formulario.controls.gestor.setValue(false);
          this.limpiarErroresFormulario();
          Swal.fire('Creada!', 'La Oficina ha sido creada.', 'success');
      });

      return;

      }
    });

    

    
    
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


  eliminarOficina(idEliminar: number) {
    
    // Mostrar el SweetAlert para confirmar la eliminación
    Swal.fire({
        title: '¿Desea eliminar la oficina?',
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
            this.oficinasService.eliminarOficina(idEliminar).subscribe(response => {
                console.log(response);
                this.obtenerCategoriasCargarTabla();
                Swal.fire('Eliminado!', 'La oficina ha sido eliminada.', 'success');
            });
        }else{
          Swal.fire('Error!', 'La oficina no ha sido eliminada.', 'error');
        }
    });
    
  }


  

  // Otros **********************************************************

  obtenerCategoriasCargarTabla(){
    this.oficinasService.obtenerOficinas().subscribe(response => {
      this.listaOficinas = response;
      this.setTable(this.listaOficinas);
    });
  }

  setTable(data:OficinaDTO[]){

    //voy simular una espera con este setTime
    setTimeout(() => {


      this.listaOficinasdataSource = new MatTableDataSource<OficinaDTO>(data);
      this.listaOficinasdataSource.paginator = this.paginator;

    }, 3000);
  }
  
  realizarBusqueda() {
    this.filtrarData();
  }

  filtrarData(){

    const data = this.listaOficinas.slice();
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
      this.setTable(this.listaOficinas);
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
    const nombre = this.formulario.controls.nombre;
   
    if (nombre.hasError('required')) {
      return 'El campo es obligatorio';
    }

    
    if (nombre.hasError('pattern')) {
      return 'El campo solo puede contener letras';
    }
    
    return ''; 
  }

  limpiarErroresFormulario() {
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.get(key)?.setErrors(null); // Eliminar los errores de cada control
    });
  }

   // Método para obtener el mensaje de error del gestorID
   obtenerErrorGestorID(): string {
    const control = this.formulario.get('gestorID');
    
    if (control?.hasError('required')) {
      return 'Debe seleccionar una oficina gestora';
    }
    
    return '';
  }

 

}

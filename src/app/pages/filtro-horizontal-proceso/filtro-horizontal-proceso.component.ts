import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoriaDTO } from '../../Core/models/CategoriaDTO';
import { CategoriasService } from '../../Core/services/categorias.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { NormasService } from '../../Core/services/normas.service';
import { TipodocumentoService } from '../../Core/services/tipodocumento.service';
import { DoctocsService } from '../../Core/services/doctocs.service';
import { FiltroVerticalService } from '../../Core/services/filtro-vertical.service';
import { ClasificacionesService } from '../../Core/services/clasificaciones.service';
import { TipodocumentoDTO } from '../../Core/models/TipodocumentoDTO';
import { DoctocDTO } from '../../Core/models/DoctocDTO';
import { ClasificacionDTO } from '../../Core/models/ClasificacionDTO';
import { MatSelectModule } from '@angular/material/select';
import { ArchivoDTO, FiltroVerticalGetDTO, FiltroVerticalGetExtendidaDTO } from '../../Core/models/FiltroVerticalGetDTO';

@Component({
  selector: 'app-filtro-horizontal-proceso',
  standalone: true,
  imports: [MatButtonModule, RouterLink,  MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, FormsModule],
  templateUrl: './filtro-horizontal-proceso.component.html',
  styleUrl: './filtro-horizontal-proceso.component.css'
})
export class FiltroHorizontalProcesoComponent {

  filtroVerticalService = inject(FiltroVerticalService);
  normasService = inject(NormasService);
  tipodocumentoService = inject(TipodocumentoService);
  categoriasService = inject(CategoriasService);
  //falta Oficinas service, despues del modulo de seguridad
  doctocsService = inject(DoctocsService);
  clasificacionesService = inject(ClasificacionesService);


  
  listaNormas! : CategoriaDTO[];
  listaTipoDocumentos! : TipodocumentoDTO[];
  listaDocumentos! : FiltroVerticalGetDTO[];
  listaCategorias! : CategoriaDTO[];
  //falta oficinas
  listaDoctos! : DoctocDTO[];
  listaClasificaciones!: ClasificacionDTO[];



  listCategoriasdataSource = new MatTableDataSource<FiltroVerticalGetExtendidaDTO>([]);
  displayedColumns: string[] = [ 'acciones',  'documento', 'version', 'oficina'  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  textoBuscar: string = "";
  estaEditando: boolean = false;
  categoriaSeleccionada!: CategoriaDTO | null;





  ngOnInit(): void {

    this.obtenerCategoriasCargarTabla();

    this.obtenerDocumentos();

    this.obtenerTipoDocumentos();
    this.obtenerCategorias();
    this.obtenerNormas();
    this.obtenerClasificaciones();
    this.obtenerDoctos();

    this.formulario.updateValueAndValidity();
  }
  
  constructor(){}

  private formbuilder = inject(FormBuilder);
  
  formulario = this.formbuilder.group({
   
    normaID: [0, [Validators.required]]
   

  });



  //CRUD *******************************************************************************
  
  obtenerDocumentos(){
    this.filtroVerticalService.obtenerFiltroVertical().subscribe(response => {
      this.listaDocumentos = response;
      console.log(this.listaDocumentos);
    });
  }

  obtenerCategoriaPorId(idBuscar:number){
    //const idBuscar: number = 1;
    this.categoriasService.obtenerCategoriaPorId(idBuscar).subscribe(response => {
      console.log(response);
    });
  }

  aplicarFiltro() {
    /*
    if (this.formulario.valid) {
      // Obtener los valores del formulario
      const filtros = this.formulario.value;
      
      // Filtrar la lista de documentos según los criterios
      let documentosFiltrados = this.listaDocumentos?.filter(doc => {
        let cumpleFiltros = true;

        // Filtrar por asunto (si no está vacío)
        if (filtros.asunto) {
          cumpleFiltros = cumpleFiltros && doc.asunto.toLowerCase().includes(filtros.asunto.toLowerCase());
        }

        // Filtrar por código
        if (filtros.codigo) {
          cumpleFiltros = cumpleFiltros && doc.codigo.toLowerCase().includes(filtros.codigo.toLowerCase());
        }

        // Filtrar por versión
        if (filtros.version) {
          //cumpleFiltros = cumpleFiltros && doc.versionID.toString() === filtros.version;
          cumpleFiltros = cumpleFiltros && doc.versionID.toString().includes(filtros.version);
        }

        // Filtrar por norma (si no es 0 - "Todos")
        if (filtros.normaID && filtros.normaID !== 0) {
          cumpleFiltros = cumpleFiltros && doc.normaID === filtros.normaID;
        }

        // Filtrar por tipo de documento
        if (filtros.tipoDocumento && filtros.tipoDocumento !== 0) {
          cumpleFiltros = cumpleFiltros && doc.tipoDocumento === filtros.tipoDocumento;
        }

        // Filtrar por categoría
        if (filtros.categoriaID && filtros.categoriaID !== 0) {
          cumpleFiltros = cumpleFiltros && doc.categoriaID === filtros.categoriaID;
        }

        // Filtrar por oficina
        if (filtros.oficinaID && filtros.oficinaID !== 0) {
          cumpleFiltros = cumpleFiltros && doc.oficinaID === filtros.oficinaID;
        }

        // Filtrar por docto
        if (filtros.doctoID && filtros.doctoID !== 0) {
          cumpleFiltros = cumpleFiltros && doc.doctoId === filtros.doctoID;
        }

        // Filtrar por clasificación
        if (filtros.clasificacionID && filtros.clasificacionID !== 0) {
          cumpleFiltros = cumpleFiltros && doc.clasificacionID === filtros.clasificacionID;
        }

        // Filtrar por palabra clave
        if (filtros.palabraClave) {
          cumpleFiltros = cumpleFiltros && doc.palabraClave.toLowerCase().includes(filtros.palabraClave.toLowerCase());
        }

        return cumpleFiltros;
      });

      // Si no hay documentos filtrados, mostrar mensaje
      if (!documentosFiltrados || documentosFiltrados.length === 0) {
        Swal.fire('Sin resultados', 'No se encontraron documentos que coincidan con los criterios de búsqueda.', 'info');
       
        return;
      }

      // Actualizar la tabla con los resultados filtrados
      this.setTable(documentosFiltrados);
     
    }
      */
  }



  // Método para descargar el documento
  /*
  descargarDocumento(archivo: any) {
    const link = document.createElement('a');
    link.href = archivo.url; // La URL donde está el archivo
    link.download = archivo.fileName; // El nombre que se mostrará al descargar
    link.click(); // Simulamos el click para iniciar la descarga
  }
    */

  descargarDocumento(archivo: any) {
    this.filtroVerticalService.manejarDescargaArchivo(archivo);
  }


  observar(id: number) {
  }

 
 



/********************************** Cargar listas para los catalogos *********************************************************************************************/

  obtenerTipoDocumentos(){
    this.tipodocumentoService.obtenerTipoducumentos().subscribe(response => {
      this.listaTipoDocumentos = response;
  })};

  obtenerCategorias(){
    this.categoriasService.obtenerCategorias().subscribe(response => {
      this.listaCategorias = response;
  })};

  obtenerNormas(){
    this.normasService.obtenerNormas().subscribe(response => {
      this.listaNormas = response;
  })};

  obtenerClasificaciones(){
    this.clasificacionesService.obtenerClasificaciones().subscribe(response => {
      this.listaClasificaciones = response;
  })};

  obtenerDoctos(){
    this.doctocsService.obtenerDoctocs().subscribe(response => {
      this.listaDoctos = response;
  })};

  

  // Otros ***************************************************************************************************

  //no esta siendo utilizado
  obtenerCategoriasCargarTabla(){
    this.filtroVerticalService.obtenerFiltroVertical().subscribe(response => {
      this.listaDocumentos = response;
      this.setTable(this.listaDocumentos);
      console.log(this.listaDocumentos);
    });
  }

  setTable(data:FiltroVerticalGetDTO[]){

    setTimeout(() => {

      const dataConRelaciones: FiltroVerticalGetExtendidaDTO[] = data.map(documento => {
        const categoria = this.listaCategorias.find(cat => cat.id === documento.categoriaID);
        const tipoDocumento = this.listaTipoDocumentos.find(tipo => tipo.id === documento.tipoDocumento);
        const norma = this.listaNormas.find(nrm => nrm.id === documento.normaID);
        const clasificacion = this.listaClasificaciones.find(clas => clas.id === documento.clasificacionID);
        const docto = this.listaDoctos.find(doctoc => doctoc.id === documento.doctoId);
  
        return {
          ...documento,
          categoriaNombre: categoria ? categoria.nombre : 'Sin Categoría',
          tipoDocumentoNombre: tipoDocumento ? tipoDocumento.nombre : 'Sin Tipo',
          normaNombre: norma ? norma.nombre : 'Sin Norma',
          clasificacionNombre: clasificacion ? clasificacion.nombre : 'Sin Clasificación',
          doctoNombre: docto ? docto.nombre : 'Sin Docto' // Suponiendo que `nombre` está en DocumentoGetDTO
        };
      });

      this.listCategoriasdataSource = new MatTableDataSource<FiltroVerticalGetExtendidaDTO>(dataConRelaciones);
      this.listCategoriasdataSource.paginator = this.paginator;
      
    }, 2000); 

  }
  
  realizarBusqueda() {
    this.filtrarData();
  }

  filtrarData(){

    /*
    const data = this.listaCategorias.slice();
    if(!this.textoBuscar){
     this.setTable(data);
      return;
    }

    const dataFiltrada = data.filter(item => {
      return item.nombre.includes(this.textoBuscar);
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
    /*
    const filterValue = event.target.value?.trim().toLowerCase() || '';
    if (!filterValue) {
      // Si esta vacio, mostrar toda la lista
      this.setTable(this.listaCategorias);
      return;
    }
      */
    //pude haber hecho todo el filtro aqui, pero se requeria la necesidad del boton buscar
  }


  // validaciones *************************************************************************************

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
    */
    return ''; 
  }

  limpiarErroresFormulario() {
    Object.keys(this.formulario.controls).forEach(key => {
      this.formulario.get(key)?.setErrors(null); // Eliminar los errores de cada control
    });
  }


}

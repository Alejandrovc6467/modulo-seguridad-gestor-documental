
export interface OficinaGestorDTO {
    id?: number,
    nombre: string;
    codigoOficina: string;
    gestor: boolean,
    eliminado: boolean
}




export interface OficinaGestorExtendidaDTO extends OficinaGestorDTO {
    nombreGestor: string;
}


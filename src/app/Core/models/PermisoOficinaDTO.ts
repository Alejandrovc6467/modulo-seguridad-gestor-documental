export interface PermisoOficinaDTO {
    permisoID: number;
    oficinaID: number;
}

export interface PermisoOficinaExtendidaDTO extends PermisoOficinaDTO {
    permisoNombre: string;
    oficinaNombre: string;
}

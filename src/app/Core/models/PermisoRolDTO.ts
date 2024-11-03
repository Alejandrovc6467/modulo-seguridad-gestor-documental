export interface PermisoRolDTO {
    permisoID: number;
    rolID: number;
}

export interface PermisoRolExtendidaDTO extends PermisoRolDTO {
    permisoNombre: string;
    rolNombre: string;
}

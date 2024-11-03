
export interface usuarioOficinaDTO {
    usuarioID: number,
    oficinaID: string;
}




export interface usuarioOficinaDTOExtendidaDTO extends usuarioOficinaDTO {
    nombreUsuario: string;
    nombreOficina: string;
}

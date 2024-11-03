
export interface usuarioOficinaDTO {
    usuarioID: number,
    oficinaID: number;
}




export interface usuarioOficinaDTOExtendidaDTO extends usuarioOficinaDTO {
    nombreUsuario: string;
    nombreOficina: string;
}

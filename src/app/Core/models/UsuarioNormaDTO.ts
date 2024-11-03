
export interface UsuarioNormaDTO {
    normaID: number;
    usuarioID: number
   
}




export interface  UsuarioNormaExtendidaDTO extends  UsuarioNormaDTO {
    nombreUsuario: string;
    nombreNorma: string;
}


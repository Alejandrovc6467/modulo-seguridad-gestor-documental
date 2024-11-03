export interface OficinaGestorIdsDTO {
    oficinaID: number,
    gestorID: number;
}


export interface OficinaGestorIdsExtendidaDTO extends OficinaGestorIdsDTO {
    oficinaNombre: string;
    gestorNombre: string;
}
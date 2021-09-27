
/** Interfaz del token recibido por WordPress */
export interface ValidateWPToken {
    code: string;
    data: Data;
}

export interface Data {
    status: number;
}

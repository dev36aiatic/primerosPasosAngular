/* Interfaz de la respuesta que me devuelve la base de datos */
export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    token?: string;
    msg?: string;
    email:string;
    user?: any;
    provider?:string;
    idToken?: string;
    authToken?: string;
}

/* Interfaz de usuario */
export interface User {
    uid?: string;
    name?: string;
    email?: string;
    id?:string;
    provider?:string;
    authToken?: string;
    idToken?: string;
}
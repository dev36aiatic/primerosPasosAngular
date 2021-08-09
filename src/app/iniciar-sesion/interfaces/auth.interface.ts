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

export interface User {
    uid?: string;
    name?: string;
    email?: string;
    id?:string;
    provider?:string;
    authToken?: string;
    idToken?: string;
}
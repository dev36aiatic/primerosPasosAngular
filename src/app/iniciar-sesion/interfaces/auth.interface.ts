/**  Interfaz de la respuesta que me devuelve la base de datos */
export interface AuthResponse {
    ok: boolean;
    token: string;
    user: User;
}

/** Interfaz de usuario */
export interface User {
    id: String,
    name: String;
    email: String;
    profile: Profile;
}

/**Interfaz del perfil del usuario */
export interface Profile {
    ZIP: Number;
    cc: Number;
    city: String;
    country: String;
    description: String;
    address: String;
    department: String;
    dateOfBirth: String;
}


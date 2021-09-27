/**Interfaz de la respuesta al iniciar sesión en WordPress */
export interface UserWordpress {
    token:             string;
    user_email:        string;
    user_nicename:     string;
    user_display_name: string;
}

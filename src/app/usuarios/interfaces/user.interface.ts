/**Interfaz del perfil recibido desde la base de datos */
export interface ProfileData {
    name:String,
    cc:String,
    address:String,
    dateOfBirth:String,
    city:String,
    department:String,
    country:String,
    ZIP:Number,
    profession:String,
    skills:String[],
    description:String
}


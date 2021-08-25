 
import * as fs from 'fs'
import { Profile } from '../entity/Profile';

/**
 * Metodo que permite borrar la imagen de perfil que tenia el usuario anteriormente
 * @param dbProfile - Perfil del usuario a borrar la imagen
 * @param existingFilePath - Ruta de donde se guardan las imagenes
 */
const deleteImage = (dbProfile:Profile,existingFilePath:string)=>{

    if(dbProfile.image != null){
        let splitExisting = existingFilePath.split('\\');
            splitExisting.splice(2);
        let url = splitExisting.join('\\')+'\\'+dbProfile.image;

        fs.unlink(url,(err)=>{
            if(err) throw err
            console.log('File deleted');
        });
    }

}
export default deleteImage;
         
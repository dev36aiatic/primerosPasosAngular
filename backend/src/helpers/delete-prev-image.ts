import * as fs from 'fs'
import { Profile } from '../entity/Profile';

/**
 * Metodo que permite borrar la imagen de perfil que tenia el usuario anteriormente
 * @param dbProfile - Perfil del usuario a borrar la imagen
 */
const deleteImage = (dbProfile: Profile) => {

    if (dbProfile.image != null) {
        let pathFile = '/src/user-images/' + dbProfile.image;
        const exist = fs.existsSync(pathFile);

        if (exist) {
            fs.unlink(pathFile, (err) => {
                if (err) throw err
                console.log('File deleted');
            });
        }
    }

}
export default deleteImage;

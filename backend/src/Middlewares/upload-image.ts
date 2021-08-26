
import * as fs from 'fs';
/**
 * Middleware que detecta si el usuario subio la imagen
 * @param req -Informacion recibida por la solicitud HTTP entrante
 * @param res - Permite enviar respuestas deseadas
 * @param next - Permite que el codigo posterior se siga ejecutando
 *returns 
 */

const uploadImage = (req, res, next) => {

    if (req.files) {

        const size = req.files.image.size;
        const filePath = req.files.image.path;
        const fileSplit = filePath.split('/');
        const fileName = fileSplit[2];
        const fileFormat = fileName.split('.');
        const format = fileFormat[1];

        if (size > 1000000 || format != 'png' && format != 'jpg') {

            fs.unlink(filePath, (err) => {
                if (err) throw err
                console.log('File deleted');
            });

            return res.status(500).json({
                ok: false,
                msg: 'The image must be in jpg or png format and size less than 1 MB.'
            });
        }

        req.fileName = fileName;
    }

    next();

}

export default uploadImage;

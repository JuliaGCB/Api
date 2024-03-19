const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

/***
 * Começando a configurar o upload das imagens
 * multer é a biblioteca que vai fazer o upload dos arquivos, precisamos de duas props para ela uma onde vai ficar o arquivo e qual é o nome do arquivo
 * storage é onde vai ficar o arquivo e o filename é o nome.
 * o cripyto é para gerar um numero aleatorio para cada arquivo e não dicar duplicado as imagens e elas ficarem de sobrepondo
 * 
 */
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); //pastas temporarias 
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "upload");

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const filehash = crypto.randomBytes(10).toString("hex"); //para não ter arquivos com o mesmo nome
            const filename = `${filehash}-${file.originalname}`;

            return callback(null, filename);
        },
    }),
};



module.exports ={
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}
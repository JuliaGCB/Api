const fs = require("fs");
const path = require("path");
const uploadconfig = require("../configs/upload");
/**
 * Salvando e deletando os arquivos no backend
 */
class DiskStorage {
    async saveFile(file){
        await fs.promises.rename( // Mudando o arquivo de pasta do TMP para o upload
            path.resolve(uploadconfig.TMP_FOLDER, file),
            path.resolve(uploadconfig.UPLOADS_FOLDER, file)
        );

        return file;
    }

    async deleteFile(file){ //Deletar um arquivo
        const filePath = path.resolve(uploadconfig.UPLOADS_FOLDER, file); // pegando o endereço do arquivo
        
        try{ //tentativa//tratamento de exessões se por um acaso o arquivo não puder ser movido, isso é uma exessão
            await fs.promises.stat(filePath);
        }catch{
            return;
        }

        await fs.promises.unlink(filePath); // para deletar é o unlink
    }
}

module.exports = DiskStorage;
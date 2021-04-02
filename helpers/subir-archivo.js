const { v4: uuidv4 } = require('uuid');
const path = require('path');


const subirArchivo = (files, extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.'); // Esto hace referencia a que el split va cortar el nombre del archivo y le pondra un punto
        const extension = nombreCortado[nombreCortado.length - 1];


        if (!extencionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida - ${extencionesValidas}`);

        }


        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemp);

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function(err) {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);

        });
    });

}

module.exports = {
    subirArchivo
}
const fs = require('fs/promises');
const path = require('path');

async function crearArchivos(cantidad) {
    const directorio = './archivos'; 

    try {
        await fs.mkdir(directorio, { recursive: true }); 

        for (let i = 1; i <= cantidad; i++) {
            const archivoPath = path.join(directorio, `archivo_${i}.txt`); 
            await fs.writeFile(archivoPath, `Este es el archivo número ${i}`);
        }

        console.log(`Se han creado ${cantidad} archivos en: ${directorio}`);
    } catch (error) {
        console.error('Error al crear los archivos:', error);
    }
}

const cantidad = 5; 

crearArchivos(cantidad);

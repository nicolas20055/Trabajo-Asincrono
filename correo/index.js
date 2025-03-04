const fs = require('fs/promises');
const path = require('path');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ortiznicolas656@gmail.com',
        pass: 'fssu mvut wkpe tpsn' 
    }
});

async function generarArchivos(cantidad, directorio) {
    try {
        await fs.mkdir(directorio, { recursive: true });
        console.log(`📁 Carpeta creada en: ${directorio}`);

        const archivos = [];
        for (let i = 1; i <= cantidad; i++) {
            const filePath = path.join(directorio, `archivo_${i}.txt`);
            archivos.push(filePath);
        }

        
        await Promise.all(
            archivos.map(file => fs.writeFile(file, 'holaa'))
        );

        console.log(`Se generaron ${cantidad} archivos en "${directorio}"`);

        await enviarCorreo(archivos);
    } catch (error) {
        console.error('Error al generar archivos:', error);
    }
}

async function enviarCorreo(archivos) {
    try {
        const mailOptions = {
            from: 'ortiznicolas656@gmail.com',
            to: 'jose2002perez2002@gmail.com',
            subject: 'Archivos Generados',
            text: `Se han generado ${archivos.length} archivos. Adjuntos en este correo.`,
            attachments: archivos.map(file => ({
                filename: path.basename(file),
                path: file
            }))
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Correo enviado con éxito: ${info.messageId}`);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

generarArchivos(5, './archivos');

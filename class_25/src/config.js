import path from 'path';
import { Command } from 'commander';
import dotenv from 'dotenv';

// Parseo de opciones de línea de comandos
const commandLine = new Command();
commandLine
    .option('--mode <mode>')
    .option('--port <port>')
    .option('--setup <number>')
commandLine.parse();
const clOptions = commandLine.opts();

/**
 * Parseo de variables de entorno
 * 
 * Dotenv busca el archivo .env e inyecta todas las variables en el entorno del sistema
 * quedan disponibles a través de process.env.
 * 
 * Si se llama a config() sin parámetros, toma por defecto un archivo de nombre .env
 * en el raíz de proyecto
 * 
 * dotenv.config();
 * 
 * Caso contrario podemos indicarle la ruta, incluso utilizar opciones de línea de
 * comandos para decidir si cargar un archivo de entorno u otro
 * 
 * dotenv.config({ path: clOptions.mode === 'prod' ? '.env.prod': '.env.devel' });
 * 
 * ALTERNATIVA: desde Node v 2.6.x existe soporte nativo para carga de vars de entorno
 * En ese caso NO es necesario dotenv, simplemente al ejecutar:
 * 
 * node --env-file ruta_archivo_env src/app
 */

const config = {
    APP_NAME: 'coder_53160',
    SERVER: 'atlas_16',
    PORT: process.env.PORT || clOptions.port || 8080,
    // Linux / Mac
    // DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    // Win
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/,
    PRODUCTS_PER_PAGE: 5,
    SECRET: process.env.SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL
}

export default config;

import * as url from 'url';

const config = {
    PORT: 5000,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    // Esta función tipo getter nos permite configurar dinámicamente
    // la propiedad UPLOAD_DIR en base al valor de otra propiedad (DIRNAME)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` } // Función getter
}

export default config;

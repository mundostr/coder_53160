import * as url from 'url';

const config = {
    PORT: 5000,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    // UPLOAD_DIR: 'public/img'
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` }
}

export default config;

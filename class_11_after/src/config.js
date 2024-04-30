import path from 'path';
// import * as url from 'url';

const config = {
    SERVER: 'server16',
    PORT: 5000,
    // DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)), // Linux / Mac
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')), // Win
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` }
}

export default config;

import path from 'path';

const config = {
    SERVER: 'atlas_16',
    PORT: 5050,
    // DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)), // Linux / Mac
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')), // Win
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    // MONGODB_URI: 'mongodb://127.0.0.1:27017/coder_53160',
    MONGODB_URI: 'mongodb+srv://coder_53160:coder2024@clustercoder.sxqjiud.mongodb.net/coder_53160',
    MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/
}

export default config;

import path from 'path';
import { Command } from 'commander';
// import dotenv from 'dotenv';

const commandLine = new Command();
commandLine
    .option('--mode <mode>')
    .option('--port <port>')
    .option('--setup <number>')
commandLine.parse();
const clOptions = commandLine.opts();

// dotenv.config({ path: clOptions.mode === 'devel' ? '.env.devel' : '.env.prod' });

const config = {
    APP_NAME: 'coder_53160',
    SERVER: 'local',
    PORT: process.env.PORT || clOptions.port || 8080,
    STORAGE: 'cloud',
    // Linux / Mac
    // DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    // Win
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    get BASEDIR() { return this.DIRNAME.slice(0, -4) },
    get UPLOAD_DIR() { return `${this.DIRNAME}/uploads` },
    CLOUDINARY_CLOUD_NAME: '',
    CLOUDINARY_API_KEY: '',
    CLOUDINARY_API_SECRET: ''
}

export default config;

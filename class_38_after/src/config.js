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

// dotenv.config({ path: clOptions.mode === 'dev' ? 'env.devel': 'env.prod'});

const config = {
    APP_NAME: 'coder_53160',
    // SERVER: 'atlas_16',
    SERVER: 'local',
    PORT: process.env.PORT || clOptions.port || 8080,
    // Linux / Mac
    // DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    // Win
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/,
    PRODUCTS_PER_PAGE: 10,
    SECRET: process.env.SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL
}

export default config;

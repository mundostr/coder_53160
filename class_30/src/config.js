import path from 'path';
import { Command } from 'commander';
import dotenv from 'dotenv';

const commandLine = new Command();
commandLine
    .option('--mode <mode>')
    .option('--port <port>')
    .option('--setup <number>')
commandLine.parse();
const clOptions = commandLine.opts();

dotenv.config({ path: clOptions.mode === 'devel' ? '.env.devel' : '.env.prod' });

const config = {
    APP_NAME: 'coder_53160',
    SERVER: 'local',
    PORT: process.env.PORT || clOptions.port || 8080,
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/,
    PERSISTENCE: 'mongo',
    GMAIL_APP_USER: 'idux.net@gmail.com',
    GMAIL_APP_PASS: process.env.GMAIL_APP_PASS,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    TWILIO_PHONE: process.env.TWILIO_PHONE
}

export default config;

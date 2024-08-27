import { Command } from 'commander';
import * as dotenv from 'dotenv';

const commandLine = new Command();
commandLine
    .option('--mode <mode>')
    .option('--port <port>')
    .option('--setup <number>')
commandLine.parse();
const clOptions = commandLine.opts();

dotenv.config({ path: (clOptions.mode === undefined || clOptions.mode === 'devel') ? '.env.devel' : '.env.prod' });

const config = {
    APP_NAME: 'coder_53160',
    SERVER: 'local',
    PORT: process.env.PORT || clOptions.port || 8080,
    MONGODB_URI: process.env.MONGODB_URI,
}

export default config;

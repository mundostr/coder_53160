import express from 'express';
import mongoose from 'mongoose';
import sessionsRouter from './routes/sessions.router.js';
import { faker } from '@faker-js/faker';
import cluster from 'cluster';
import { cpus } from 'os';

if (cluster.isPrimary) {
    // Inicializando cluster de 8 instancias
    for (let i = 0; i < cpus().length; i++) cluster.fork();

    cluster.on('exit', (worker, code, signal) =>{
        console.log(`Se cayó la instancia ${worker.process.pid}`);
        cluster.fork();
    });
} else {
    try {
        const app = express();
        const PORT = process.env.PORT || 8080;
        
        const connection = await mongoose.connect(process.env.MONGODB_URI);
            
        app.use(express.json());
        app.use('/api/sessions',sessionsRouter);
            
        app.get('/api/test/user',(req,res)=>{
            let first_name = faker.name.firstName();
            let last_name = faker.name.lastName();
            let email = faker.internet.email();
            let password =  faker.internet.password();
            res.send({first_name,last_name,email,password})
        });
            
        app.listen(PORT, () => console.log(`Listening on PORT ${PORT} (PID ${process.pid})`))
    } catch (err) {
        console.log(`Error starting app (${err.message})`);
    }
}

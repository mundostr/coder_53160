import express from 'express';
import mongoose from 'mongoose';
import sessionsRouter from './routes/sessions.router.js';
import { faker } from '@faker-js/faker';

const app = express();
const PORT = process.env.PORT || 8080;

const connection = await mongoose.connect('mongodb://127.0.0.1:27017/coder_53160')
    
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

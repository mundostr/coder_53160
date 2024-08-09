const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    age: Number
}));

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        // Acá tenemos una vulnerabilidad, aceptamos por línea de comandos un query,
        // y lo enviamos al find() sin ningún control previo.
        const query = req.query.filter;
        const users = await User.find(JSON.parse(query));
        res.json(users);
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
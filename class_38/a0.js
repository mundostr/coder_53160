const express = require('express');
const app = express();
const port = 3000;

const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' },
    { id: 3, name: 'Charlie', role: 'user' }
];

function isAuthenticated(req, res, next) {
    // Acá realizamos el control de autenticación y devolvemos los datos
    // Como el id de usuario llega por req.params, al no revisar niveles
    // de autorización, cualquier usuario podrá ver cualquier lista de datos
    // colocando un id válido, no solo el suyo.
    req.user = { id: 2, name: 'Bob', role: 'user' };
    next();
}

app.get('/user/:id', isAuthenticated, (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
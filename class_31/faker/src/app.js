import bcrypt from 'bcrypt';
import express from 'express';
import { faker } from '@faker-js/faker';

/**
 * Modelo User mongoose:
 * - firstName (String)
 * - lastName (String)
 * - email (String, tipo email)
 * - password (String, tipo hash)
 * - role (String, enum user, premium, admin)
 */

const generateFakeUsers = async (qty) => {
    const users = [];
    const ROLES = ['admin', 'premium', 'user'];

    for (let i = 0; i < qty; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName });
        const password = await bcrypt.hash(faker.internet.password(), 10);
        const role = ROLES[Math.floor(Math.random() * ROLES.length)];

        users.push({ firstName, lastName, email, password, role });
    }

    return users;
}

const PORT = 3000;
const app = express();

app.get('/fakeusers/:qty', async (req, res) => {
    const data = await generateFakeUsers(parseInt(req.params.qty));
    res.status(200).send({ status: 'OK', payload: data });
});

app.listen(PORT, () => {
    console.log('App activa en puerto 3000');
});

import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
/**
 * Utilizamos el requester de supertest para poder realizar solicitudes
 * http, es decir, realizar los tests desde los propios endpoints
 */
const requester = supertest('http://localhost:8080');
const testUser = { first_name: 'Juan', last_name: 'Perez', email: 'jperez@gmail.com', password: 'abc445' };
let cookie = {};

describe('Test Integración Users', function () {

    it('POST /api/sessions/register debe registrar un nuevo usuario', async function () {
        const { _body }  = await requester.post('/api/sessions/register').send(testUser);

        expect(_body.error).to.be.undefined;
        expect(_body.payload).to.be.ok;
    });

    it('POST /api/sessions/register NO debe volver a registrar el mismo mail', async function () {
        const { statusCode, _body }  = await requester.post('/api/sessions/register').send(testUser);

        expect(statusCode).to.be.equals(400);
    });

    it('POST /api/sessions/login debe ingresar correctamente al usuario', async function () {
        const result  = await requester.post('/api/sessions/login').send(testUser);
        const cookieData = result.headers['set-cookie'][0];
        cookie = { name: cookieData.split('=')[0], value: cookieData.split('=')[1] };

        expect(cookieData).to.be.ok;
        expect(cookie.name).to.be.equals('coderCookie');
        expect(cookie.value).to.be.ok;
    });

    it('GET /api/sessions/current debe retornar datos correctos de usuario', async function () {
        const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`]);

        expect(_body.payload).to.have.property('name');
        expect(_body.payload).to.have.property('role');        
        expect(_body.payload).to.have.property('email').and.to.be.eql(testUser.email);
    });
});

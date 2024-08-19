import chai from 'chai';
import { createHash, passwordValidation } from '../src/utils/index.js';

const expect = chai.expect;
const testPassword = 'abc123';
// Esta expresión regular (regex) nos permite verificar si la cadena
// tiene un formato válido de hash Bcrypt.
const validBcryptFormat = /^\$2[aby]\$10\$.{53}$/;

describe('Tests Utils', function () {
    before(function () {});
    beforeEach(function () {});
    after(function () {});
    afterEach(function () {});
    
    // Lista de tests
    it('createHash() debe hashear correctamente la clave', async function () {
        const result = await createHash(testPassword);

        // expect(result).to.be.not.equal(testPassword);
        expect(result).to.match(validBcryptFormat);
    });

    it('passwordValidation() debe retornar true si coincide hash', async function () {
        const hashed = await createHash(testPassword);
        const result = await passwordValidation({ password: hashed }, testPassword);

        expect(result).to.be.true;
    });

    it('passwordValidation() debe retornar false si no coincide hash', async function () {
        let hashed = await createHash(testPassword);
        hashed = 'cualquier_otra_cosa';
        const result = await passwordValidation({ password: hashed }, testPassword);

        expect(result).to.be.false;
    });
});

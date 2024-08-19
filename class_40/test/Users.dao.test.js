import Assert from 'assert';
import mongoose from 'mongoose';
import UsersDAO from '../src/dao/Users.dao.js';

const connection  = await mongoose.connect('mongodb://127.0.0.1:27017/coder_53160');
const dao = new UsersDAO();
const assert = Assert.strict;
const testUser = { first_name: 'Juan', last_name: 'Perez', email: 'jperez@gmail.com', password: 'abc445' };

describe('Test DAO Users', function () {
    // Se ejecuta ANTES de comenzar el paquete de tests
    before(function () {
        mongoose.connection.collections.adoptme_users.drop();
    });
    // Se ejecuta ANTES DE CADA test
    beforeEach(function () {
        this.timeout = 3000;
    });
    // Se ejecuta LUEGO de finalizar el paquete de tests
    after(function () {});
    // Se ejecuta LUEGO DE CADA test
    afterEach(function () {});

    it('get() debe retornar un array de usuarios', async function () {
        const result = await dao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it('save() debe retornar un objeto con los datos del nuevo usuario', async function () {
        const result = await dao.save(testUser);
        assert.strictEqual(typeof(result), 'object');
        assert.ok(result._id);
        assert.deepStrictEqual(result.pets, []);
    });

    it('getBy() debe retornar un objeto coincidente con el criterio indicado', async function () {
        const result = await dao.getBy({ email: testUser.email });
        
        // Aprovechamos a guardar el id del usuario de prueba que acabamos de crear
        testUser._id = result._id;

        assert.strictEqual(typeof(result), 'object');
        assert.ok(result._id);
        assert.deepStrictEqual(result.email, testUser.email);
    });

    it('update() debe retornar un objeto con los datos modificados', async function () {
        const modifiedMail = 'pepe@pepe.com';
        const result = await dao.update(testUser._id, { email: modifiedMail });

        assert.strictEqual(typeof(result), 'object');
        assert.ok(result._id);
        assert.strictEqual(result.email, modifiedMail);
    });

    it('delete() debe borrar definitivamente el documento indicado', async function () {
        const result = await dao.delete(testUser._id);

        assert.strictEqual(typeof(result), 'object');
        assert.deepStrictEqual(result._id, testUser._id);
    });
});

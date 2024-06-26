import getToysService from '../services/toys.service.js';

const getToys = async () => {
    return await getToysService();
}

const addToy = async (newToy) => {
    return await createToy();
}

export default getToys;

import toyModel from '../models/toy.model.js';

const getToysService = async () => {
    return await toyModel.find().lean();
}

export default getToysService;

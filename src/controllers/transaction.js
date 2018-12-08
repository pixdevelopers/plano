import { Transaction } from '../models/transaction';
const _ = require('lodash');

module.exports = {
    getAllTransactions: async (req, res, next) => {
        const result = await Transaction.find({});
        if (!result) return res.status(404).send('Not found.');
        res.send(result);
    },
    getClientTransactions: async (req, res, next) => {
        const result = await Transaction.find({ client: req.user._id });
        if (!result) return res.status(404).send('Not found.');
        res.send(result);
    },

    getByDate: async (req, res, next) => {
        let start = new Date(req.body.start.substring(1, 10));
        let end = new Date(req.body.end.substring(1, 10));

        const result = await Transaction.find({
            createdAt: {
                $gte: start, $lte: end
            }
        });
        if (!result) return res.status(404).send('Not found.');
        res.send(result);
    }
};

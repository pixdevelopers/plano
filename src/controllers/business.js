import { Business, validate } from '../models/business';

module.exports = {
    getAll: async (req, res, next) => {
        const result = await Business.find();
        res.send(result);
    },

    get: async (req, res, next) => {
        const result = await Business.findById(req.params.id);
        if (!result) return res
            .status(404)
            .send(
                'The business with the given ID was not found.'
            );
        res.send(result);
    },

    create: async (req, res, next) => {
        const { error } = validate(req.body.params);
        if (error) return res.status(400).send(error.details[0].message);

        let business = new Business({ name: req.body.params.name, client: req.user._id });

        business = await business.save();

        res.send(business);
    },

    update: async (req, res, next) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const updatedAt = Date.now;
        const result = await Business.findByIdAndUpdate(req.params.id, { name: req.body.params.name, updatedAt: updatedAt, client: req.user._id }, { new: true });

        if (!result) return res.status(404).send('The business with the given ID was not found.');

        res.send(result);
    },

    delete: async (req, res, next) => {
        const result = await Business.findByIdAndRemove(req.params.id);
        if (!result) return res.status(404).send('The business with the given ID was not found.');
        res.send(result);
    }
};

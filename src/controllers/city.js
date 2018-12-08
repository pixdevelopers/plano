import { City, validate } from '../models/city';

module.exports = {
    getAll: async (req, res, next) => {
        const result = await City.find({});
        res.send(result);
    },

    get: async (req, res, next) => {
        const result = await City.findById(req.params.id);
        if (!result) return res
            .status(404)
            .send(
                'The city with the given ID was not found.'
            );
        res.send(result);
    },

    create: async (req, res, next) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let city = new City({
            name: req.body.params.name,
            country: req.body.params.countryId,
            user: req.user._id
        });

        city = await city.save();

        res.send(city);
    },

    update: async (req, res, next) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const updatedAt = Date.now;
        const result = await City.findByIdAndUpdate(req.params.id, { name: req.body.params.name, updatedAt, country: req.body.params.countryId, client: req.user._id }, { new: true });

        if (!result) return res.status(404).send('The city with the given ID was not found.');

        res.send(result);
    },

    delete: async (req, res, next) => {
        const result = await City.findByIdAndRemove(req.params.id);
        if (!result) return res.status(404).send('The city with the given ID was not found.');
        res.send(result);
    }
};

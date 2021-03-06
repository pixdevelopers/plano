import { Ads, validate } from '../models/ads';
module.exports = {

    getAll: async (req, res, next) => {
        const result = await Ads.find();
        res.send(result);
    },

    get: async (req, res, next) => {
        const result = await Ads.findById(req.params.id);
        if (!result) return res
            .status(404)
            .send(
                'The Ads with the given ID was not found.'
            );
        res.send(result);
    },

    create: async (req, res, next) => {
        const { error } = validate(req.body.params);
        if (error) return res.status(400).send(error.details[0].message);

        const { title, adsURL, size, duration, pageLocation, linkToRedirect, description } = req.body.params;

        let ads = new Ads({ title, adsURL, size, duration, pageLocation, linkToRedirect, description, client: req.user._id });

        ads = await ads.save();

        res.send(ads);
    },

    update: async (req, res, next) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { title, adsURL, size, duration, pageLocation, linkToRedirect, description } = req.body.params;
        const updatedAt = Date.now;
        const ads = await Ads.findByIdAndUpdate(req.params.id,
            { title, adsURL, size, duration, pageLocation, linkToRedirect, isExpired, description, updatedAt }, { new: true });

        if (!ads) return res.status(404).send('The ads with the given ID was not found.');

        res.send(ads);
    },

    delete: async (req, res, next) => {
        const ads = await Ads.findByIdAndRemove(req.params.id);
        if (!ads) return res.status(404).send('The ads with the given ID was not found.');
        res.send(ads);
    }
}
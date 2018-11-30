import express from 'express';
const router = express.Router();
import { Country, validate } from '../models/country';

router.get('/', async (req, res, next) => {
    const result = await Country.find();
    res.send(result);
});

router.get('/:id', async (req, res, next) => {
    const result = await Country.findById(req.params.id);
    if (!result) return res
        .status(404)
        .send(
            'The Country with the given ID was not found.'
        );
    res.send(result);
});

router.post('/', async (req, res, next) => {
    const { error } = validate(req.body.params);
    if (error) return res.status(400).send(error.details[0].message);

    let country = new Country({ name:req.body.params.name , client:req.body._id });

    country = await country.save();

    res.send(country);
});

router.put('/:id', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const updatedAt = Date.now;
    const result = await Country.findByIdAndUpdate(req.params.id, { name: req.body.params.name, updatedAt, client:req.body._id }, { new: true });

    if (!result) return res.status(404).send('The country with the given ID was not found.');

    res.send(result);
});

router.delete('/:id', async (req, res, next) => {
    const result = await Country.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send('The country with the given ID was not found.');
    res.send(result);
});


export default router;

import express from 'express';
const router = express.Router();
import { City, validate } from '../models/city';

router.get('/', async (req, res, next) => {
    const result = await City.find();
    res.send(result);
});

router.get('/:id', async (req, res, next) => {
    const result = await City.findById(req.params.id);
    if (!result) return res
        .status(404)
        .send(
            'The city with the given ID was not found.'
        );
    res.send(result);
});

router.post('/', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let city = new City({ name: req.body.params.name, country: req.body.params.countryId, user=req.body._id });

    city = await city.save();

    res.send(city);
});

router.put('/:id', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const updatedAt = Date.now;
    const result = await City.findByIdAndUpdate(req.params.id, { name: req.body.params.name, updatedAt, country: req.body.params.countryId,  user=req.body._id }, { new: true });

    if (!result) return res.status(404).send('The city with the given ID was not found.');

    res.send(result);
});

router.delete('/:id', async (req, res, next) => {
    const result = await City.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send('The city with the given ID was not found.');
    res.send(result);
});


export default router;

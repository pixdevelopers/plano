import express from 'express';
const router = express.Router();
import { Service, validate } from '../models/service';

router.get('/day/:date', async (req, res, next) => {
    const result = await Service.find({});
    res.send(result);
});

router.get('/:id', async (req, res, next) => {
    const result = await Business.findById(req.params.id);
    if (!result) return res
        .status(404)
        .send(
            'The business with the given ID was not found.'
        );
    res.send(result);
});

router.post('/', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let business = new Business({ name: req.body.name, user=req.body._id });

    business = await business.save();

    res.send(business);
});

router.put('/:id', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const updatedAt = Date.now;
    const result = await Business.findByIdAndUpdate(req.params.id, { name: req.body.name, updatedAt, user=req.body._id }, { new: true });

    if (!result) return res.status(404).send('The business with the given ID was not found.');

    res.send(result);
});

router.delete('/:id', async (req, res, next) => {
    const result = await Business.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send('The business with the given ID was not found.');
    res.send(result);
});


export default router;

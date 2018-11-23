import express from 'express';
const router = express.Router();
import { Service, validate } from '../models/service';
const _ = require('lodash');

// router.get('/day/:date', async (req, res, next) => {
//     const result = await Service.find({});
//     res.send(result);
// });

router.get('/:id', async (req, res, next) => {
    const result = await Service.findById(req.params.id);
    if (!result) return res
        .status(404)
        .send(
            'The business with the given ID was not found.'
        );
    res.send(result);
});

router.post('/', async (req, res, next) => {
    if (Array.isArray(req.body.params)) {
        
        req.body.params.forEach(srv => {
            let service = new Service(_.cloneDeep(srv));
            service = await service.save();
        });

    } else {
        const { error } = validate(req.body.params);
        if (error) return res.status(400).send(error.details[0].message);
        res.send(service);
    }

});

router.put('/:id', async (req, res, next) => {
    const { error } = validate(req.body.params);
    if (error) return res.status(400).send(error.details[0].message);
     let service= await Service.findById(req.params.id);
    if (!result) return res.status(404).send('The service with the given ID was not found.');
    service = _.cloneDeep(req.body.params);
    service.updatedAt = Date.now;
    service = await service.save();

    res.send(service);
});

router.delete('/:id', async (req, res, next) => {
    const result = await Service.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send('The business with the given ID was not found.');
    res.send(result);
});


export default router;

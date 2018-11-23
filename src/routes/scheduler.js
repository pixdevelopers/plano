import express from 'express';
const router = express.Router();
import { Scheduler, validate } from '../models/scheduler';
import { Service } from '../models/service';

router.get('/:id/:start/:end', async (req, res, next) => {
    const start = moment(req.params.start, 'YYYY-MM-DD').toDate();
    const end = moment(req.params.end, 'YYYY-MM-DD').toDate();
    const result = await Scheduler.find({client:req.params.id,start:{$gte:start,$lte:end}});
    res.send(result);
});

router.get('/:id', async (req, res, next) => {
    const result = await Scheduler.findById(req.params.id);
    if (!result) return res
        .status(404)
        .send(
            'The schedule with the given ID was not found.'
        );
    result = await Service.find({ scheduler:result._id});        
    res.send(result);
});

router.post('/', async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let scheduler = new Scheduler(_.cloneDeep(req.body.params));
    scheduler.client = req.body._id ;
    scheduler = await scheduler.save();

    res.send(scheduler);
});

router.put('/:id', async (req, res, next) => {
    const { error } = validate(req.body.params);
    if (error) return res.status(400).send(error.details[0].message);
    let scheduler = await Scheduler.findById(req.params.id);
    if (!scheduler) return res
        .status(404)
        .send('The schedule with the given ID was not found.');
    scheduler = _.cloneDeep(req.body.params);
    scheduler.updatedAt = Date.now;
    scheduler= await scheduler.save();
    res.send(scheduler);
});

router.delete('/:id', async (req, res, next) => {
    const result = await Scheduler.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send('The schedule with the given ID was not found.');
    res.send(result);
});


export default router;

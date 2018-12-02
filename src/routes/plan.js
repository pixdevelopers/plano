import express from 'express';
const router = express.Router();
import { Plan, validate } from '../models/plan';
const _ = require('lodash');

router.get('/', async (req, res, next) => {
    const result = await Plan.find({});
    res.send(result);
});

router.get('/:status', async (req, res, next) => {
    const result = await Plan.find({ isActive:req.params.status});
  res.send(result);
});

router.get('/:id', async (req, res, next) => {
    const result = await Plan.findById(req.params.id);
    if (!result) return res
                   .status(404)
                   .send(
                     'The plan with the given ID was not found.'
                   );
    res.send(result);
});

router.post('/', async (req, res, next) => {
    const { error } = validate(req.body.params);
    if (error) return res.status(400).send(error.details[0].message);
    let plan = new Plan(_.cloneDeep(req.body.params));
    plan.client = req.client._id;
    plan = await plan.save();
    res.send(plan);
});

router.put('/:id', async (req, res, next) => {
    const { error } = validate(req.body.params);
    if (error) return res.status(400).send(error.details[0].message);
    let plan = await Plan.findById(req.params.id);
    if (!result) return res.status(404).send('The plan with the given ID was not found.');
    plan = _.cloneDeep(req.body.params);
    plan.updatedAt = Date.now;
    plan = await plan.save();

    res.send(plan);
});

router.delete('/:id', async (req, res, next) => {
    const result = await Plan.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send('The business with the given ID was not found.');
    res.send(result);
});


export default router;

import { Plan, validate } from '../models/plan';
const _ = require('lodash');

module.exports = {

    getAll: async (req, res, next) => {
        const result = await Plan.find({});
        res.send(result);
    },
    getByStatus: async (req, res, next) => {
        const result = await Plan.find({ isActive: req.params.status });
        res.send(result);
    },

    get: async (req, res, next) => {
        const result = await Plan.findById(req.params.id);
        if (!result) return res
            .status(404)
            .send(
                'The plan with the given ID was not found.'
            );
        res.send(result);
    },

    create: async (req, res, next) => {
        const { error } = validate(req.body.params);
        if (error) return res.status(400).send(error.details[0].message);
        let plan = new Plan(_.cloneDeep(req.body.params));
        plan.client = req.user._id;
        plan = await plan.save();
        res.send(plan);
    },

    update: async (req, res, next) => {
        const { error } = validate(req.body.params);
        if (error) return res.status(400).send(error.details[0].message);
        let plan = await Plan.findById(req.params.id);
        if (!result) return res.status(404).send('The plan with the given ID was not found.');
        plan = _.cloneDeep(req.body.params);
        plan.updatedAt = Date.now;
        plan = await plan.save();

        res.send(plan);
    },

    delete: async (req, res, next) => {
        const result = await Plan.findByIdAndRemove(req.params.id);
        if (!result) return res.status(404).send('The plan with the given ID was not found.');
        res.send(result);
    }
};

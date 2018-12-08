import { Service, validate } from '../models/service';
const _ = require('lodash');

module.exports = {
  getAll: async (req, res, next) => {
      const result = await Service.find({client:req.user._id});
    res.send(result);
  },

    getById: async (req, res, next) => {
        const result = await Service.findById(req.params.id);
        if (!result)
            return res
                .status(404)
                .send('The business with the given ID was not found.');
        res.send(result);
    },

    create: async (req, res, next) => {
        if (Array.isArray(req.body.params)) {
            req.body.params.forEach(async srv => {
                let service = new Service(_.cloneDeep(srv));
                service = await service.save();
            });
        } else {
            const { error } = validate(req.body.params);
            if (error) return res.status(400).send(error.details[0].message);
            res.send(service);
        }
    },

    update: async (req, res, next) => {
        const { error } = validate(req.body.params);
        if (error) return res.status(400).send(error.details[0].message);
        let service = await Service.findById(req.params.id);
        if (!result)
            return res.status(404).send('The service with the given ID was not found.');
        service = _.cloneDeep(req.body.params);
        service.updatedAt = Date.now;
        service = await service.save();

        res.send(service);
    },

    delete: async (req, res, next) => {
        const result = await Service.findByIdAndRemove(req.params.id);
        if (!result)
            return res
                .status(404)
                .send('The business with the given ID was not found.');
        res.send(result);
    }
};

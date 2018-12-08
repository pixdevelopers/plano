import Client from '../models/client';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { sendEmailRegistration } from '../util/email';

module.exports = {
    
  getAll: async (req, res, next) => {
    const result = await Client.find({});
    res.send(result);
  },

  get: async (req, res, next) => {
    const result = await Client.findById(req.user._id);
    if (!result)
      return res
        .status(404)
        .send('The client with the given ID was not found.');
    res.send(result);
  },

  create: async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let client = await Client.findOne({
      userName: req.body.userName
    });

    if (client) return res.status(400).send('User already registered.');

    client = new Client(
      _.pick(req.body, ['name', 'userName', 'password', 'businessId', 'cityId'])
    );

    const salt = await bcrypt.genSalt(10);
    client.password = await bcrypt.hash(client.password, salt);

    await client.save();

    // await sendEmailRegistration(client.email,{name:clent.name});

    const token = client.generateAuthToken();
    res
      .header('x-auth-token', token)
      .send(_.pick(client, ['_id', 'name', 'userName']));
  },

  update: async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const client = await Client.findById(req.user._id);
    if (!client)
      return res
        .status(404)
        .send('The client with the given ID was not found.');
    const clnt = _.omit(req.body.params, 'file');
    if (req.body.params.file) clnt.avatar = req.body.params.file;
    client.set(clnt);
    client.updatedAt = Date.now;
    await client.save();
    res.send(client);
  },

  delete: async (req, res, next) => {
    const result = await Client.findByIdAndRemove(req.params.id);
    if (!result)
      return res
        .status(404)
        .send('The client with the given ID was not found.');
    res.send(result);
  },

  remove: async (req, res, next) => {
      const result = await Client.findByIdAndRemove(req.user._id);
    if (!result)
      return res
        .status(404)
        .send('The client with the given ID was not found.');
    res.send(result);
  }
};

import express from 'express';
const router = express.Router();
import Client from '../models/client';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { sendEmailRegistration } from '../util/email';
router.get('/', async (req, res, next) => {
  const result = await Client.findById(req.client._id);
  if (!result)
    return res.status(404).send('The client with the given ID was not found.');
  res.send(result);
});

router.post('/', async (req, res, next) => {
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
});

router.put('/', async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const client = await Client.findById(req.client._id);
  if (!client)
    return res.status(404).send('The client with the given ID was not found.');
  client.set(req.body.params);
  client.updatedAt = Date.now;
  await client.save();
  res.send(client);
});

router.delete('/', async (req, res, next) => {
  const result = await Client.findByIdAndRemove(req.client._id);
  if (!result)
    return res.status(404).send('The client with the given ID was not found.');
  res.send(result);
});

export default router;

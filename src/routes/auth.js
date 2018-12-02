import express from 'express';
const router = express.Router();
import Client from '../models/client';
import bcrypt from 'bcrypt';
import _ from 'lodash';

router.post('/', async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let client = await Client.findOne({ userName: req.body.userName });

  if (!client) return res.status(400).send('Invalid username or password');

  const validPassword = await bcrypt.compare(
    req.body.password,
    client.password
  );
  if (!validPassword)
    return res.status(400).send('Invalid username or password');
  const token = client.generateAuthToken();
  res.send(token);
});

export default router;

import express from 'express';
const router = express.Router();
import Client from '../models/client';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import crypto from 'crypto';

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

router.post('/forget', async (req, res, next) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let client = await Client.findOne({
    email: req.body.email
  });

  if (!client)
    return res.status(400).send('No account with that email address');
  const buf = await crypto.randomBytes(20);
  const token = buf.toString('hex');
  client.token = token;
  client.tokenExpire = Date.now() + 3600000;//One hour
  await client.save();
  const url=`http://${req.headers.host}/reset/${token}`;
  //TODO await sendEmailResetPassowrd(client.email,{name:clent.name,url:url});
  res.status(200).send(`An email has sent to ${client.email}`);
});

router.post('/reset/:token', async (req, res, next) => {

  if (req.body.password!==req.body.confirm) return res.status(401).send('Password do not match.');

  let client = await Client.findOne({
    token: req.params.token, tokenExpire:{$gte:Date.now}
  });

  if (!client)
    return res.status(401).send('Password rest token is invalid or has expired.');
  const salt = await bcrypt.genSalt(10);
  client.password = await bcrypt.hash(client.password, salt);
  client.token =undefined;
  client.tokenExpire = undefined;
  await client.save();
  
  //TODO await sendEmailPassowrdChanged(client.email,{name:clent.name});
  res.status(200).send(`Success! Your password has been changed.`);
});

export default router;

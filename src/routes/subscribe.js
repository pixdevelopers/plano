import express from 'express';
const router = express.Router();
import { Client } from '../models/client';
import { Subscribe } from '../models/subscribe';

//Get all subscribers for current client
router.get('/', async (req, res, next) => {
  const result = await Client.findById(req.body._id)
    .populate('subscribes.clientId', 'name userName avatar')
    .select('subscribes.clientId');
  if (!result)
    return res.status(404).send('The client with the given ID was not found.');
  res.send({
    userName: result.clientId.userName,
    name: result.clientId.name,
    avatar: result.clientId.avatar
  });
});
//Get count of subscribers
router.get('/count', async (req, res, next) => {
  const result = await Client.findById(req.body._id).select('subscribes');
  if (!result)
    return res.status(404).send('The client with the given ID was not found.');
  res.send(result.subscribes.length);
});

//subscribe or unsubscribe
router.put('/', async (req, res, next) => {
  let client = await Client.findById(req.body._id);
  const result = client.subscribes.id(req.body.clientId);
  if (result) {
      client.subscribes.id(req.body.clientId).remove();
      client=await client.save();
      return res.send('You have already unsubscribed');
  }

    const subscribe = new Subscribe({ clientId: req.body.clientId });
    client.subscribes.push(subscribe);
  client = await client.save();
  res.send('Your subscribing has been registered');
});

export default router;

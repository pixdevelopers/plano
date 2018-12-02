import express from 'express';
const router = express.Router();
import { Subscribe } from '../models/subscribe';

//Get all subscribers for current client
router.get('/', async (req, res, next) => {
  const result = await Subscribe.find({ clientId: req.body._id })
    .populate('subscriber', 'name userName avatar')
    .select('subscriber');
  if (!result)
    return res.status(404).send('The client with the given ID was not found.');
  res.send({
    userName: result.subscriber.userName,
    name: result.subscriber.name,
    avatar: result.subscriber.avatar
  });
});
//Get count of subscribers
router.get('/count/:id', async (req, res, next) => {
  const result = await Subscribe.find({clientId: req.params.id });
  if (!result)
    return res.status(404).send('The client with the given ID was not found.');
  res.send(result.subscribes.length);
});

//subscribe or unsubscribe
router.put('/:id', async (req, res, next) => {
  let result = await Subscribe.findOne({
    client: req.params.id,
    subscriber: req.client._id
  });

  if (result) {
    await Subscribes.findByIdAndRemove(result._id);
    return res.send('unsubscribing is done');
  }

  const subscribe = new Subscribe({ client: req.params.id, subscriber: req.body._id });
  await subscribe.save();
  res.send('subscribing is done');
});

//notification on/off
router.put('/notefication/:id', async (req, res, next) => {
  let result = await Subscribe.findOne({
    client: req.params.id,
    subscriber: req.client._id
  });
  if (!result)
    return res.status(404).send('The client with the given ID was not found.');
  
   result.showNotification = !result.showNotification;
   await result.save();
  const status = result.showNotification ? 'On' : 'Off';
  return res.send(`Notification ${status}`);
  
});

export default router;

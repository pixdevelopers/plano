import express from 'express';
const router = express.Router();
import Client from '../models/client';
import ServiceType from '../models/serviceType';
router.get('/public/:id', async (req, res, next) => {
  const client = await Client.findById(req.params.id).select(
    'name email avatar description profile.mobile profile.isParkingAvailble profile.address profile.location profile.webSite profile.qrCode profile.description'
  );
  if (!client)
    return res.status(404).send('The client with the given ID was not found.');
  const services = await ServiceType.find({ client: req.params.id }).select(
    'name price duration description'
  );
  //TODO add rating to each service
  res.send({ client, services });
});
router.get('/', async (req, res, next) => {
  const result = await Client.findById(req.params.id);
  if (!result)
    return res.status(404).send('The client with the given ID was not found.');
  res.send(result);
});

router.put('/', async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const updatedAt = Date.now;
  const result = await Client.findByIdAndUpdate(req.body._id, { name: req.body.name, updatedAt: updatedAt }, { new: true });

  if (!result)
    return res.status(404).send('The client with the given ID was not found.');

  res.send(result);
});

router.delete('/', async (req, res, next) => {
  const result = await Client.findByIdAndRemove(req.params.id);
  if (!result)
    return res.status(404).send('The client with the given ID was not found.');
  res.send(result);
});

export default router;

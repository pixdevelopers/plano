import express from 'express';
const router = express.Router();
import Client from '../models/client';
// router.get('/', async (req, res, next) => {
//   const result = await Client.find();
//   res.send(result);
// });
router.get('/', async (req, res, next) => {
  const result = await Client.findById(req.params.id);
  if (!result) return res
      .status(404)
      .send('The client with the given ID was not found.');
  res.send(result);
});

router.put('/', async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const updatedAt = Date.now;
  const result = await Client.findByIdAndUpdate(req.body._id, { name: req.body.name, updatedAt, user=req.body._id }, { new: true });

  if (!result) return res.status(404).send('The client with the given ID was not found.');

  res.send(result);
});

router.delete('/', async (req, res, next) => {
  const result = await Client.findByIdAndRemove(req.params.id);
  if (!result) return res.status(404).send('The client with the given ID was not found.');
  res.send(result);
});


export default router;

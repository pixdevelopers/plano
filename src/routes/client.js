import express from 'express';
const router = express.Router();
import Client from '../models/client';
router.get('/', async (req, res, next) => {
  const result = await Client.find();
  res.send(result);
});
router.get('/:id', async (req, res, next) => {
  const result = await Client.findById(req.params.id);
  if (!result) return res
      .status(404)
      .send('The client with the given ID was not found.');
  res.send(result);
});
export default router;

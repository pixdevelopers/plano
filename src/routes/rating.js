import express from 'express';
const router = express.Router();
import { Client } from '../models/client';
import { Service } from '../models/service';
import { Rating } from '../models/rating';


//Get all clients that rated for current client profile
router.get('/profile', async (req, res, next) => {
    const result = await Client.findById(req.user._id)
        .populate('ratings.client','name userName avatar')
        .select('ratings.rank ratings.client');
    if (!result) return res
        .status(404)
        .send(
            'The client with the given ID was not found.'
        );
    res.send({ userName: result.client.userName, name: result.client.name, avatar: result.client.avatar, rank: result.rank});
});
//Get all clients that rated for a service
router.get('/service/:id', async (req, res, next) => {
    const result = await Service.findById(req.params.id)
        .populate('ratings.client', 'name userName avatar')
        .select('ratings.rank ratings.client');
    if (!result) return res
        .status(404)
        .send(
            'The service with the given ID was not found.'
        );
    res.send({ userName: result.client.userName, name: result.client.name, avatar: result.client.avatar, rank: result.rank });
});

router.put('/profile', async (req, res, next) => {
    let client = await Client.findById(req.body.clientId);
    const result = client.ratings.id(req.user._id);
    if (!result) return res
        .status(404)
        .send('You have already rated');
    const rate = new Rating({
      client: req.user._id,
      rank: req.body.rank
    });
    client.ratings.push(rate);
    client=await client.save();
    res.send('Your rating has been registered');
});

router.put('/service/:id', async (req, res, next) => {
  let service = await Service.findById(req.params.Id);
    const result = service.ratings.id(req.user._id);
  if (!result) return res.status(404).send('You have already rated');
    const rate = new Rating({ client: req.body._id, rank: req.body.params.rank, comment: req.body.params.comment });
    service.ratings.push(rate);
    service = await service.save();
  res.send('Your rating has been registered');
});


export default router;

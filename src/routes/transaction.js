import express from 'express';
const router = express.Router();
import { Client } from '../models/client';
import { Transaction } from '../models/transaction';


//Get all transactions for client
router.get('/me', async (req, res, next) => {
    const result = await Transaction.find({client:req.user._id});
    if (!result) return res.status(404).send('Not found.' );
    res.send(result);
});
router.get('/', async (req, res, next) => {
    const result = await Transaction.find({});
    if (!result) return res.status(404).send('Not found.');
    res.send(result);
});
//Get Transactions brtween two dates
router.get('/date', async (req, res, next) => {
    let start = new Date(req.body.start.substring(1,10));
    let end = new Date(req.body.end.substring(1, 10));

    const result = await Transaction.find({ createdAt:{
        $gte:start,$lte:end
    }});
  if (!result) return res.status(404).send('Not found.');
  res.send(result);
});



export default router;

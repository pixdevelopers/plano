import express from 'express';
import client from './client';
import rating from './rating';
import subscribe from './subscribe';

const router = express.Router();

router.use('/client', client);
router.use('/rating', rating);
router.use('/subscribe', subscribe);

export default router;

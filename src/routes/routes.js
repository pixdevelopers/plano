import express from 'express';
import client from './client';
import rating from './rating';

const router = express.Router();

router.use('/client', client);
router.use('/rating', rating);

export default router;

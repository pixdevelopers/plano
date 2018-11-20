import express from 'express';
import client from './client';

const router = express.Router();

router.use('/client', client);

export default router;

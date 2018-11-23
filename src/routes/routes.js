import express from 'express';
import client from './client';
import rating from './rating';
import subscribe from './subscribe';
import service from './service';
import plan from './plan';
import scheduler from './scheduler';
import business from './business';
import country from './country';
import city from './city';
import ads from './ads';

const router = express.Router();

router.use('/client', client);
router.use('/rating', rating);
router.use('/subscribe', subscribe);
router.use('/service', service);
router.use('/plan', plan);
router.use('/scheduler', scheduler);
router.use('/business', business);
router.use('/country', country);
router.use('/city', city);
router.use('/ads', ads);

export default router;

import express from 'express';
import auth from '../middlewares/auth';
import client from './client';
import rating from './rating';
import service from './service';
import plan from './plan';
import scheduler from './scheduler';
import business from './business';
import country from './country';
import city from './city';
import ads from './ads';
import login from './auth';
import info from './info';

const router = express.Router();

router.use('/info', info);
router.use('/client', auth, client);
router.use('/rating', rating);
router.use('/service', service);
router.use('/plan', plan);
router.use('/scheduler', scheduler);
router.use('/business', business);
router.use('/country', country);
router.use('/city', city);
router.use('/ads', ads);
router.use('/login', login);

export default router;

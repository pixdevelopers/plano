import express from 'express';
const router = express.Router();
import controller from '../controllers/transaction';


router.route('/me').post(controller.getClientTransactions);
router.route('/').post(controller.getAllTransactions);
router.route('/date').post(controller.getByDate);

export default router;

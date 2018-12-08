import express from 'express';
const router = express.Router();
import controller from '../controllers/info';

router.route('/:code').get(controller.getByCode);
router.route('/qr/:code').get(controller.getByQr);

export default router;

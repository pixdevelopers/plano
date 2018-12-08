import express from 'express';
const router = express.Router();
import controller from '../controllers/adverts';

router.route('/')
    .get(controller.getAll)
    .post(controller.create);

router.route('/:id')
  .get(controller.get)
  .put(controller.update)
  .delete(controller.delete);    

export default router;

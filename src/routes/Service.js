import express from 'express';
const router = express.Router();
import controller from '../controllers/service';

router.route('/')
  .post(controller.create);

router.route('/:id')
  .get(controller.getById)
  .put(controller.update)
  .delete(controller.delete);



export default router;

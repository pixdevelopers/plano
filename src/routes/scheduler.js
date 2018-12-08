import express from 'express';
const router = express.Router();
import controller from '../controllers/scheduler';



router.route('/:id/:start/:end')
    .get(controller.getByDate);

router.route('/')
    .post(controller.create);

router.route('/:id')
  .get(controller.getById)
  .put(controller.update)
  .delete(controller.delete);


export default router;

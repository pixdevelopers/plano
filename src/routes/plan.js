import express from 'express';
const router = express.Router();
import controller from '../controllers/plan';

router
    .route('/')
    .get(controller.getAll)
    .post(controller.create);

router
    .route('/:id')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete); 

router
    .route('/status/:status')
  .get(controller.getByStatus);


export default router;

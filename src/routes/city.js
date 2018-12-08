import express from 'express';
import controller from '../controllers/city';
const router = express.Router();

router.route('/')
    .get(controller.getAll)
    .post(controller.create);

router.route('/:id')
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete); 

export default router;

import express from 'express';
const router = express.Router();
import controller from '../controllers/rating';


router.route('/profile')
    .get(controller.getByProfile);

router.route('/profile/:id')
      .put(controller.rateProfile);
router
  .route('/service/:id')
    .get(controller.getByServiceId)
    .put(controller.rateService);
  //.delete(controller.delete);


export default router;

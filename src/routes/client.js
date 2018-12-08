import express from 'express';
const router = express.Router();
import multer from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatar/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString());
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({ storage: storage, fileFilter: fileFilter });
router
  .route('/')
  .get(controller.get)
  .post(controller.create)
  .put(upload.single('avatar'), controller.update)
  .delete(controller.remove);

router.route('/:id')
    .delete(controller.delete); 


export default router;

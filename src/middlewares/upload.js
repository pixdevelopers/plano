import multer from 'multer';
module.exports = function (req, res, next) {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/avatar/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now())
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
}

var multer = require('multer');

module.exports = function (app) {

    let upload = multer({ dest: 'uploads/' });

    app.post("/api/image-upload", upload.single('photo'), function (req, res, next) {
        console.log(req.file);
    });

};
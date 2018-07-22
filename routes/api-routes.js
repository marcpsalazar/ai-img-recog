require("dotenv").config(); 
const fs = require('fs');
const multer = require('multer');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

const visualRecognition = new VisualRecognitionV3({
    version: process.env.WATSON_VERSION,
    iam_apikey: process.env.WATSON_APIKEY
});

module.exports = function (app) {

    let upload = multer({ dest: 'uploads/' });

    app.post("/api/image-upload", upload.single('photo'), function (req, res, next) {

        console.log(req.file);

        let image_file = fs.createReadStream(req.file.path);
        const classifier_ids = ["trees_1995546525"];
        const threshold = 0.6;

        let params = {
            images_file: image_file,
            classifier_ids: classifier_ids,
            threshold: threshold
        };

        visualRecognition.classify(params, function(err, response) {
            if (err)
              console.log(err);
            else
              console.log(JSON.stringify(response, null, 2))
          });
    });

};

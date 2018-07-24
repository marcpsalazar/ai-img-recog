require("dotenv").config(); 
const fs = require('fs');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

// Initiaize Watson Visual Recognition
const visualRecognition = new VisualRecognitionV3({
    version: process.env.WATSON_VERSION,
    iam_apikey: process.env.WATSON_APIKEY
});
//---*

// Initialize AWS
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-1'
});  

const s3 = new aws.S3();

let path = "https://s3.amazonaws.com/leafy-me/public/";

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "leafy-me/public",
        key: function (req, file, cb) {
            //console.log(file);
            let newImage = file.fieldname + Date.now() + ".jpg";
            path += newImage;
            cb(null, newImage);
        }
    })
});
//--*

module.exports = function (app) {

    // Route for image upload to AWS, Watson processing, etc.
    app.post("/api/image-upload", upload.single('photo'), function (req, res, next) {

        console.log(req.file.location); // The image file is availbe on AWS, specified by req.file.location

        // Set up Watson parameters
        let image_url =  req.file.location; 
        const classifier_ids = ["trees_1995546525"];
        const threshold = 0.6;

        let params = { 
            url: image_url,
            classifier_ids: classifier_ids,
            threshold: threshold
        };
        //--*

        visualRecognition.classify(params, function(err, response) { // Watson request
            if (err)
              console.log(err);
            else
              console.log(JSON.stringify(response, null, 2));
          });
    });

};

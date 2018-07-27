require("dotenv").config(); 
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const db = require("../models");
const mongoose = require('mongoose');


// Initialize Mongo
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/leafy";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
//---*

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

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "leafy-me/public",
        key: function (req, file, cb) {
            console.log(file);
            let path = "https://s3.amazonaws.com/leafy-me/public/";
            let newImage = file.fieldname + Date.now() + ".jpg";
            path += newImage;
            cb(null, newImage);
        }
    })
});
//---*

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
        //---*

        visualRecognition.classify(params, function(err, response) { // Watson request
            if (err)
              console.log(err);
            else //get Watson results back
              console.log(JSON.stringify(response, null, 2));
              let trees = response.images[0].classifiers[0].classes; // Access Watson returned tree types
              if (trees.length === 0) { // If there are no tree types, respond client that the image isn't recognized
                return res.send("Image not recognized");
              } else if (trees.length === 1) { // If there is one tree type, make a database entry and return tree data to client
              // Mongo storage
                let result = {};
                result.path = image_url;
                db.Tree.create(result)
                    .then(function(dbTree) {
                        console.log(dbTree);
                        res.send(dbTree);
                    })
                    .catch(function(err) {
                        return res.json(err);
                    });
              //---*
                } else { // If there are more than one tree types identified, ask client for help.
                    res.send("Please pick one of these images");
                }
          });
    });

};

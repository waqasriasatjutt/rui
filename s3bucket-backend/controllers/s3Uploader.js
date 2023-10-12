const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Set up AWS credentials and region
AWS.config.update({
  accessKeyId: 'AKIA42R57AAB7KDYJJIL',
  secretAccessKey: 'JSmA428iFBPYW+Oxalf0NPKYGkajB847n4+ZN1iA',
  region: 'us-east-1',
});
const bucketName = "testingimg046"; // Replace with your S3 bucket name
const s3 = new AWS.S3();

// Configure multer to handle FormData
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read', // Make uploaded files public
    key: function (req, file, cb) {
      cb(null, 'uploads/' + Date.now().toString() + '-' + file.originalname);
    },
  }),
});

// Define a function to handle image uploads
function uploadImage(req, res, next) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading file' });
    }

    // Access the uploaded file's information from req.file
    const file = req.file;

    // Check if a file was uploaded
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get the public URL of the uploaded image
    const imageUrl = file.location;

    // Attach the imageUrl to the request object for use in your API handlers
    req.imageUrl = imageUrl;

    next(); // Move to the next middleware or route handler
  });
}

module.exports = uploadImage;

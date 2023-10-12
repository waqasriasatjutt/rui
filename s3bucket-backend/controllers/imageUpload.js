const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const Comment = require("../modals/commentsModal");
const Order = require("../modals/ordersModal");

aws.config.update({
  accessKeyId: "AKIA42R57AAB7KDYJJIL",
  secretAccessKey: "JSmA428iFBPYW+Oxalf0NPKYGkajB847n4+ZN1iA",
  region: "us-east-1", // Replace with your desired region
});
const s3 = new aws.S3();
const bucketName = "testingimg046"; // Replace with your S3 bucket name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: "public-read", // Set the ACL permissions as needed
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, "uploads/" + Date.now().toString() + "-" + file.originalname);
    },
  }),
});

exports.uploadImage = async (req, res, next) => {
  try {
    await upload.single('file')(req, res, async(err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(400).json({ error: 'Error uploading file' });
      }

      // Access the uploaded file's information from req.file
      const file = req.file;
      const { type, comment, name, order_number, comment_by } = req?.body;

      // Check if a file was uploaded
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Get the public URL of the uploaded image
      const imageUrl = file.location;
      if (type === "production" || type === "proof") {
        const newComment = comment + " " + imageUrl;

        try {
          const commentResult = await Comment.create({
            order_number,
            comment_by,
            comment: newComment,
            name,
          });

          // You may want to handle the result here if needed
        } catch (err) {
          console.error("Error submitting comment:", err);
          return res.status(500).json({ error: "Error submitting comment" });
        }
      }

      try {
        const order = await Order.findOne({
          where: { order_number },
        });

        if (!order) {
          return res.status(400).json({ error: "Record not found" });
        }

        const existingImages = JSON.parse(order.images) || [];
        const updatedImages = [...existingImages, imageUrl];

        await order.update({ images: JSON.stringify(updatedImages) });
      } catch (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      // Generate the public URL of the uploaded image
      res.status(200).json({ message: "Image uploaded successfully", path: file.location });
    });
  } catch (err) {
    console.error("Error handling file upload:", err);
    return res.status(500).json({ error: 'Error handling file upload' });
  }

};





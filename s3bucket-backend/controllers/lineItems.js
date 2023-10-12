const LineItem = require("../modals/lineItemsModal");

const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

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
exports.getLineItems = async (req, res) => {
  const orderNumber = req.params.order_number;

  try {
    const lineItems = await LineItem.findAll({
      where: { order_number: orderNumber },
      order: [["id", "DESC"]],
    });

    res.status(200).json(lineItems);
  } catch (err) {
    console.error("Database query error: " + err.stack);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.addLineItem = async (req, res) => {
  try {
    await upload.single("file")(req, res);
    const file = req.file;
    const { order_number, title, size, qty, price } = req?.body;

    // Check if a file was uploaded
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newLineItem = {
      order_number,
      title,
      size,
      qty,
      price,
      image: file.location,
    };

    // Create a new LineItem record using Sequelize
    const createdLineItem = await LineItem.create(newLineItem);

    // Generate the public URL of the uploaded image
    res.status(200).json({
      message: "Line item created successfully",
      lineItem: createdLineItem, // Optionally, return the created line item
    });
  } catch (err) {
    console.error("Error handling file upload:", err);
    res.status(500).json({ error: "Error handling file upload" });
  }
};

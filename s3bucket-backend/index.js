const app = require("./app");
const port = process.env.PORT || 3002;

const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const authRoutes = require("./routes/auth");
const imageRoutes = require("./routes/imageUploader");
const ordersRoutes = require("./routes/orders");
const commentsRoutes = require("./routes/comments");
const orderStatusRoutes = require("./routes/orderStatus");
const proofStatusRoutes = require("./routes/proofStatus");
const lineItemsRoutes = require("./routes/lineItems");
const uploadTypes = require("./routes/uploadTypes");
const Order = require("./modals/ordersModal");
const Comment = require("./modals/ordersCommentsModal");
const LineItem = require("./modals/lineItemsModal");
const Upload = require("./modals/uploads");
const ProofStatus = require("./modals/proofStatusModal");
const Proofs = require("./modals/proofsModal");
const UploadProofs = require("./modals/uploadProofs");

app.use(
  "/api",
  authRoutes,
  orderStatusRoutes,
  ordersRoutes,
  commentsRoutes,
  lineItemsRoutes,
  proofStatusRoutes,
  uploadTypes
);

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

app.post("/api/upload", upload.array("files", 10), async (req, res) => {
  const files = req.files; // This will be an array of uploaded files
  const {
    type,
    comment,
    name,
    order_number,
    comment_by,
    type_name,
    line_item_id,
  } = req.body;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  try {
    const uploadResults = files.map((file) => {
      // Get the public URL of each uploaded file
      return file.location;
    });

    if (type_name === "Production" || type_name === "Proof") {
      const newComment = comment + " " + uploadResults[0];

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
    if (type_name === "Proof") {
      const status = await ProofStatus.findOne({
        where: { name: "Active" },
      });
      console.log("🚀 ~ file: index.js:96 ~ app.post ~ status:", status)
      if (!status) {
        return res.status(500).json({ error: "Proof status not found" });
      }
      try {
        const upload = await Upload.create({
          url: uploadResults[0],
          upload_type_id: type,
          line_item_id: line_item_id,
        });
        console.log("Upload Created", upload);
        const proof = await Proofs.create({
          proof_number: upload?.id,
          line_item_id: line_item_id,
          status_id: status?.id,
        });
        console.log("Proofs Created", proof);
        const uploadProofs = await UploadProofs.create({
          upload_id: upload?.id,
          proof_id: proof?.id,
        });
        console.log("UploadProofs Created", uploadProofs);
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
      const updatedImages = [...existingImages, ...uploadResults];
      await order.update({ images: updatedImages });
    } catch (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({
      message: "Files uploaded successfully",
      paths: uploadResults,
    });
  } catch (error) {
    console.error("Error processing file uploads:", error);
    res.status(500).json({ error: "Error processing file uploads" });
  }
});
app.post("/api/add_items", upload.single("file"), async (req, res) => {
  const file = req.file;
  const { order_number, title, size, qty, price } = req?.body;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const newLineItem = {
      order_number,
      title,
      created_at: new Date(),
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
    console.error("Error submitting comment:", err);
    res.status(500).json({ error: "Error submitting comment" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// php -S localhost:8080
// nodemon index.js
// npx sequelize-cli db:migrate

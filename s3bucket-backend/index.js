const app = require("./app");
const port = process.env.PORT || 3000;

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
const connection = require("./config/database");
const Order = require("./modals/ordersModal");
const Comment = require("./modals/commentsModal");
const LineItem = require("./modals/lineItemsModal");

app.use(
  "/api",
  authRoutes,
  orderStatusRoutes,
  ordersRoutes,
  commentsRoutes,
  lineItemsRoutes,
  proofStatusRoutes
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

// app.post("/api/upload", upload.single("file"), async(req, res) => {
//   const file = req.file;
//   const { type, comment, name, order_number, comment_by } = req?.body;
//   if (!file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   // Get the public URL of the uploaded image
//   const imageUrl = file.location;
//   if (type === "production" || type === "proof") {
//     const newComment = comment + " " + imageUrl;

//     try {
//       const commentResult = await Comment.create({
//         order_number,
//         comment_by,
//         comment: newComment,
//         name,
//       });

//       // You may want to handle the result here if needed
//     } catch (err) {
//       console.error("Error submitting comment:", err);
//       return res.status(500).json({ error: "Error submitting comment" });
//     }
//   }
//   try {
//     const order = await Order.findOne({
//       where: { order_number },
//     });

//     if (!order) {
//       return res.status(400).json({ error: "Record not found" });
//     }

//     const existingImages = JSON.parse(order.images) || [];
//     const updatedImages = [...existingImages, imageUrl];

//     await order.update({ images: updatedImages });
//   } catch (err) {
//     console.error("Database query error:", err);
//     return res.status(500).json({ error: "Database error" });
//   }
//   // Generate the public URL of the uploaded image
//   res
//     .status(200)
//     .json({ message: "Image uploaded successfully", path: file.location });
// });

app.post("/api/upload", upload.array("files", 10), async (req, res) => {
  const files = req.files; // This will be an array of uploaded files
  const { type, comment, name, order_number, comment_by } = req.body;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  try {
    const uploadResults = files.map((file) => {
      // Get the public URL of each uploaded file
      return file.location;
    });

    if (type === "production" || type === "proof") {
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

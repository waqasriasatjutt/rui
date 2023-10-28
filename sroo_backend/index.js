const app = require("./app");
const port = process.env.PORT || 3002;

const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const { Order, Upload, OrderUpload } = require("./modals/ordersModal");
const ordersRoutes = require("./routes/orders");
const sequelize = require("./config/database");
const { Sequelize } = require("sequelize");

app.use("/api", ordersRoutes);

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
app.post("/api/orders", upload.array("files", 10), async (req, res) => {
  const files = req.files; // This will be an array of uploaded files
  const { name, address1, address2, email, suburb, postCode, state } = req.body;
  console.log("🚀 ~ file: index.js:44 ~ app.post ~ req.body:", req.body);
  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  try {
    const order_id = await Order.create({
      name,
      address1,
      address2,
      email,
      suburb,
      postCode,
      state,
    });
    for (const file of files) {
      const upload = await Upload.create({
        url: file?.location,
        filesize: req.body[`${file.originalname}-size`],
      });
      const sql_query = `INSERT INTO ordersUpload (upload_id, order_id, qty, createdAt, updatedAt)
  VALUES (${upload?.id},${order_id?.id}, ${
        req.body[`${file.originalname}-qty`]
      }, '2023-10-24 23:01:11.347 +00:00', '2023-10-24 23:01:11.347 +00:00')`;
      const orderUpload = await sequelize.query(sql_query, {
        type: Sequelize.QueryTypes.CREATE,
      });
      // const orderUpload = await OrderUpload.create({
      //   order_id: order_id?.id,
      //   Upload_id: upload?.id,
      //   qty: qty,
      // });
    }
    res.status(200).json({
      message: "Files uploaded successfully",
      // paths: uploadResults,
    });
  } catch (error) {
    console.error("Error processing file uploads:", error);
    res.status(500).json({ error: "Error processing file uploads" });
  }
});
// sequelize.sync({ logging: console.log });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

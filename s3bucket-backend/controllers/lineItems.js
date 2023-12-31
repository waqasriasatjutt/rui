const LineItem = require("../modals/lineItemsModal");

const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const Proofs = require("../modals/proofsModal");
const UploadProofs = require("../modals/uploads");
const Uploads = require("../modals/uploads");
const ProofStatus=require('../modals/proofStatusModal')
const {Sequelize} = require("sequelize");
const LineItemsComments = require("../modals/lineItemsComments");
const sequelize = new Sequelize({
  dialect: 'mssql', // Use the SQL Server dialect
  host: 'sroo.cufw4bzo6bry.ap-southeast-2.rds.amazonaws.com',
  port: 1433, // SQL Server default port
  database: 'test_db',
  username: 'sroo_admin',
  password: '7hXPPiTl66KzdQjD',
  dialectOptions: {
    options: {
      encrypt: true, // For encrypted connections
      trustServerCertificate:true
    },
  },
});

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


exports.getLineItemDetail = async (req, res) => {
  const itemId = req.params.line_item_id;

  try {
    const sqlQuery = `SELECT li.*, p.*, u.*
      FROM line_items as li
      LEFT JOIN Proofs p ON li.id = p.line_item_id AND p.status_id=1 OR li.id = p.line_item_id AND p.status_id>1
      LEFT JOIN Upload_Proofs up ON p.id = up.proof_id
      LEFT JOIN Uploads u ON up.upload_id = u.id
      WHERE li.id = :itemId`;
      const comments = await LineItemsComments.findAll({
        where: { line_item_id: itemId },
        order: [['id', 'DESC']],
      });
    const [results, metadata] = await sequelize.query(sqlQuery, {
      replacements: { itemId },
      type: Sequelize.QueryTypes.SELECT,
    });
    if (!results || results.length === 0) {
      return res.status(404).json({ message: 'Line item not found' });
    }

    // Process the results as needed

    res.status(200).json({...results,comments});
  } catch (err) {
    console.error('Database query error: ' + err.stack);
    return res.status(502).json({ message: 'Internal server error' });
  }
};

// exports.getLineItemDetail = async (req, res) => {
//   const itemId = req.params.line_item_id;
//   try {
//     const lineItems = await LineItem.findOne({
//       where: { id: itemId },
//     });
//
//     // const proofs = await Proofs.findAll({
//     //   where: { line_item_id: itemId },
//     //   include: [
//     //     {
//     //       model: Uploads,
//     //       through: {
//     //         model: UploadProofs, // The join table
//     //       },
//     //     },
//     //   ],
//     // });
//
//     // Step 1: Get Proofs by line_item_id
//   const proofs = await Proofs.findOne({
//     where: { line_item_id: itemId,status_id: 1, },
//   });
//   console.log("🚀 ~ file: lineItems.js:54 ~ exports.getLineItemDetail= ~ proofs:", proofs)
//
//   // Step 3: Get UploadProofs by proof_id
//   const uploadProofs = await UploadProofs.findOne({
//     where: { proof_id: proofs?.id },
//   });
//   console.log("🚀 ~ file: lineItems.js:63 ~ exports.getLineItemDetail= ~ uploadProofs:", uploadProofs)
//
//   // Step 5: Get Uploads by upload_id
//   const uploads = await Uploads.findOne({
//     where: { id: uploadProofs.upload_id },
//   });
//   console.log("🚀 ~ file: lineItems.js:73 ~ exports.getLineItemDetail= ~ uploads:", uploads)
//
//     console.log(uploads);
//
//     res.status(200).json({...lineItems?.dataValues,proofs:uploads});
//   } catch (err) {
//     console.error("Database query error: " + err.stack);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
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

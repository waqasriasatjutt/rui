const UploadTypes = require("../modals/uploadTypes");

exports.getUploadTypes = async (req, res) => {
  try {
    // Fetch all order statuses from the database
    const statuses = await UploadTypes.findAll();

    res.status(200).json(statuses);
  } catch (err) {
    console.error('Error fetching order statuses:', err);
    res.status(500).json({ error: 'Error fetching order statuses' });
  }
};
exports.addUploadTypes = async (req, res) => {
  try {
    const { name } = req.body;
    // Insert the order status into the database
    const insertedOrderStatus = await UploadTypes.create({
      name,
    });

    res.status(201).json(insertedOrderStatus);
  } catch (err) {
    console.error('Error adding order status:', err);
    res.status(500).json({ error: 'Error adding order status' });
  }
};



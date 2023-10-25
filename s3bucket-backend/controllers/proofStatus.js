const ProofStatus = require("../modals/proofStatusModal");
const Proofs = require("../modals/proofsModal");
const LineItemsComments = require("../modals/lineItemsComments");

exports.getProofStatus = async (req, res) => {
  try {
    // Fetch all order statuses from the database
    const statuses = await ProofStatus.findAll();

    res.status(200).json(statuses);
  } catch (err) {
    console.error('Error fetching order statuses:', err);
    res.status(500).json({ error: 'Error fetching order statuses' });
  }
};
exports.addProofStatus = async (req, res) => {
  try {
    const { name } = req.body;
    // Insert the order status into the database
    const insertedOrderStatus = await ProofStatus.create({
      name,
    });

    res.status(201).json(insertedOrderStatus);
  } catch (err) {
    console.error('Error adding order status:', err);
    res.status(500).json({ error: 'Error adding order status' });
  }
};

exports.updateProofStatus = async (req, res) => {
  try {
    const { status_id, proof_number } = req.body;
    // Update the payment status in the database
    const [, updatedRows] = await Proofs.update(
      { status_id: status_id },
      {
        where: {
          line_item_id:proof_number,
          status_id:1
        },
      }
    );
    if (updatedRows === 0) {
      // No rows were updated (order not found)
      return res.status(404).json({ error: "Proof not found" });
    }
    const insertedComment = await LineItemsComments.create({
      line_item_id:proof_number,
      comment_by:"Customer",
      comment:`Proof for this line item has been ${status_id===2?"Approved":status_id===3?"Rejected":"Archived"}`,
      name:"",
    });
    res.status(200).json({ message: "Proof status update successfully" });
  } catch (err) {
    console.error("Error updating proof status:", err);
    res.status(500).json({ error: "Error updating proof status" });
  }
};

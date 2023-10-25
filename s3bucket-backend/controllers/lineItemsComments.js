const LineItemsComments = require("../modals/lineItemsComments");
exports.addLineItemComment = async (req, res) => {
  try {
    const { line_item_id, comment_by, comment, name } = req.body;

    const insertedComment = await LineItemsComments.create({
      line_item_id,
      comment_by,
      comment,
      name,
    });

    res.status(201).json(insertedComment);
  } catch (err) {
    console.error("Error submitting comment:", err);
    res.status(500).json({ error: "Error submitting comment" });
  }
};

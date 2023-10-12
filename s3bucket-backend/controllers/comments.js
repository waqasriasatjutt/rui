const Comment= require("../modals/commentsModal");
const Order = require("../modals/ordersModal");

exports.getComments = async (req, res) => {
  const orderNumber = req.params.order_number;

  try {
    const comments = await Comment.findAll({
      where: { order_number: orderNumber },
      order: [['id', 'DESC']],
    });

    const order = await Order.findOne({
      where: { order_number: orderNumber },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ ...order.toJSON(),images:JSON.parse(order?.images), comments: comments });
  } catch (err) {
    console.error("Database query error: " + err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.addComment = async (req, res) => {
  try {
    const { order_number, comment_by, comment, name } = req.body;

    const insertedComment = await Comment.create({
      order_number,
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


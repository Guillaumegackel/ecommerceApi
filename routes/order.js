const Order = require("../models/order");

const {
  verifyToken,
  verifyTokenAndRole,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Le produit a été supprimé");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ORDER
router.get("/find/:userId", verifyTokenAndRole, async (req, res) => {
  try {
    const Order = await Order.find({ userId: req.params.userId });
    res.status(200).json(Order);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET MONTHLY INCOM

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

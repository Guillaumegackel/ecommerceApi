const cart = require("../models/cart");

const {
	verifyToken,
	verifyTokenAndRole,
	verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Product(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndRole, async (req, res) => {
  try {
    const updatedCart = await cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndRole, async (req, res) => {
  try {
    await cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Le produit a été supprimé");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET PRODUCT
router.get("/find/:userId",verifyTokenAndRole, async (req, res) => {
  try {
    const Cart = await cart.find({userId:req.params.userId});
    res.status(200).json(Cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// // GET ALL PRODUCTS
router.get("/", verifyTokenAndAdmin, async(req, res)=>{
	try {
		const carts = await cart.find(carts);
		res.status(200).json(carts)
	} catch (error) {
		res.status(500).json(error)
	}
})

module.exports = router;

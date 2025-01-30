import { Router } from "express";
const router = Router();

// Menu routes
router.get("/menu", (req, res) => {
  res.json({ message: "Menu endpoint is live" });
});

router.get("/menu/categories", (req, res) => {
  res.json({ message: "Menu categories endpoint is live" });
});

// Order routes
router.get("/orders", (req, res) => {
  res.json({ message: "Orders endpoint is live" });
});

router.post("/orders", (req, res) => {
  res.json({ message: "Create order endpoint is live" });
});

router.get("/orders/:id", (req, res) => {
  res.json({
    message: `Order details endpoint is live for order ${req.params.id}`,
  });
});

// Cart & Checkout routes
router.get("/cart", (req, res) => {
  res.json({ message: "Cart endpoint is live" });
});

router.post("/checkout", (req, res) => {
  res.json({ message: "Checkout endpoint is live" });
});

// Restaurant routes
router.get("/restaurants", (req, res) => {
  res.json({ message: "Restaurants listing endpoint is live" });
});

router.get("/restaurants/:id", (req, res) => {
  res.json({
    message: `Restaurant details endpoint is live for restaurant ${req.params.id}`,
  });
});

// User profile routes
router.get("/profile", (req, res) => {
  res.json({ message: "User profile endpoint is live" });
});

router.get("/profile/addresses", (req, res) => {
  res.json({ message: "Delivery addresses endpoint is live" });
});

module.exports = router;

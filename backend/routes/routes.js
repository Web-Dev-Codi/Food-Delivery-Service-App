import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send({ message: "API is live" });
});

// Order routes
router.get("/orders", (req, res) => {
  res.send({ message: "Orders endpoint is live" });
});

router.post("/orders", (req, res) => {
  res.send({ message: "Create order endpoint is live" });
});

router.get("/orders/:id", (req, res) => {
  res.send({
    message: `Order details endpoint is live for order ${req.params.id}`,
  });
});

// User profile routes
router.get("/profile", (req, res) => {
  res.send({ message: "User profile endpoint is live" });
});

router.get("/profile/addresses", (req, res) => {
  res.send({ message: "Delivery addresses endpoint is live" });
});
// Password reset route
router.get("/reset-password/:token", (req, res) => {
	const { token } = req.params;
	// Logic to validate the token and render a password reset page or send a response.
	res.redirect(`http://localhost:5173/reset-password/${token}`);
  });
  


export default router;

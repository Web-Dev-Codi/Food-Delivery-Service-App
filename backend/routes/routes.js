import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
	res.send({ message: "API is live" });
});

// Menu routes
router.get("/menu", (req, res) => {
	res.send({ message: "Menu endpoint is live" });
});

router.get("/menu/categories", (req, res) => {
	res.send({ message: "Menu categories endpoint is live" });
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

// Restaurant routes
router.get("/restaurants", (req, res) => {
	res.send({ message: "Restaurants listing endpoint is live" });
});

router.get("/restaurants/:id", (req, res) => {
	res.send({
		message: `Restaurant details endpoint is live for restaurant ${req.params.id}`,
	});
});

// User profile routes
router.get("/profile", (req, res) => {
	res.send({ message: "User profile endpoint is live" });
});

router.get("/profile/addresses", (req, res) => {
	res.send({ message: "Delivery addresses endpoint is live" });
});

export default router;

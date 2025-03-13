// switched to email service branch
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER, // Replace with your Gmail address
		pass: process.env.GMAIL_PASSWORD, // Replace with your Gmail password (or use an app password)
	},
});

export const sendPaymentSuccessEmail = async (user, payment) => {
    if (!user?.email) {
        console.error("❌ User email is missing. Cannot send email.");
        return;
    }

       // Ensure `cartId` exists and contains items
       if (!payment.cartId || payment.cartId.length === 0) {
        console.warn("⚠️ No cart data found for this payment.");
        return;
    }

    // Extract and format cart details
    const cartItems = payment.cartId.map(cart => {
        return cart.items.map(item => 
            `${item.foodItemId?.name || "Unknown Item"} - ${item.quantity} x €${item.foodItemId?.price || 0}`
        ).join("\n");
    }).join("\n\n");


    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: "Payment Successful",
        text: `
Dear ${user.name || "Customer"},

Your payment of $ ${payment.amount} has been successfully processed!

Transaction ID: ${payment.stripePaymentIntentId}

🛒 Order Details:
${cartItems}

Thank you for your purchase!
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Payment success email sent to: ${user.email}`);
    } catch (error) {
        console.error("❌ Failed to send email:", error);
    }
};

// switched to email service branch
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

        export  const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER, // Replace with your Gmail address
          pass: process.env.GMAIL_PASSWORD, // Replace with your Gmail password (or use an app password)
        },
      });

      export const sendPaymentSuccessEmail = (user, payment) => {
        const mailOptions = {
            from: process.env.GMAIL_USER, // sender address
            to: user.email, // recipient email from the user's details
            subject: 'Payment Successful', // Subject of the email
            text: `Dear ${user.name},\n\nYour payment of €${payment.amount} has been successfully processed!\n\nTransaction ID: ${payment.stripePaymentIntentId}\n\nThank you for your purchase!`, // Email body
          };
        
         return transporter.sendMail(mailOptions);
        };



import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm";

import {loadStripe} from '@stripe/stripe-js';


const stripePromise = loadStripe("pk_test_51QpRWNGOBWdkGRw0ZvcDq67gGtXySdQUxNZif5af8M7v1H12kAujDscDWXd4vcExcQXYNy5iSYreTU1CCZCpbCTU00AFm9G6td");


const Checkout = () => {
    const [successPayment, setSuccessPayment] = useState(false);
    const [loading, setLoading] = useState(false);
    



    return (
        <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-lg rounded-lg shadow-sm p-4 md:p-6">
                

                {successPayment ? (
                    <div className="text-center">
                        <p className="text-green-500 font-medium mb-4">✅ Payment Successful!</p>
                    </div>
                ) : (
                    <Elements stripe={stripePromise} key={stripePromise}>
                        <CheckoutForm setSuccessPayment={setSuccessPayment} loading={loading} 
                        setLoading={setLoading}  />
                    </Elements>
                )}
            </div>

           
        </div>
    );
};

export default Checkout;

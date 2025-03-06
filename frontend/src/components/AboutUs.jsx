import { useState, useEffect } from "react";

const AboutUs = () => {
    const [showMission, setShowMission] = useState(false);
    const [showWhy, setShowWhy] = useState(false);
    const [showSpecial, setShowSpecial] = useState(false);
    const [showGreenCommitment, setShowGreenCommitment] = useState(false);
    const [showJoinMovement, setShowJoinMovement] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowMission(true), 1000); 
        const timer2 = setTimeout(() => setShowWhy(true), 2000); 
        const timer3 = setTimeout(() => setShowSpecial(true), 2500); 
        const timer4 = setTimeout(() => setShowGreenCommitment(true), 3000); 
        const timer5 = setTimeout(() => setShowJoinMovement(true), 3500); 

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
        };
    }, []);

    return (
        <div className="min-h-screen mt-10 bg-neutral-800/60 backdrop-blur-md rounded-lg p-6 shadow-lg flex items-center justify-center gap-8  border-neutral-600 text-white-800  font-semibold   font-sans">
            <div className="max-w-4xl mt-10 mx-auto">
                <h1 className="text-4xl font-bold text-orange-500 mb-6">About Four Flavors Express</h1>

                <p className="text-lg mb-4">Welcome to <strong>Four Flavors Express</strong> – Fast, Fresh, Flavorful & Future-Focused! 🌍</p>

                <p className="mb-4">We are more than a delivery app we are your forward-thinking food companion. From delivering mouth-watering dishes to embracing innovative practices, we care about your cravings and our shared future.</p>

                {showMission && (
                    <div>
                        <h2 className="text-2xl font-semibold text-orange-400 mt-6">Our Mission</h2>
                        <p className="mb-4">Our mission is to <strong>deliver happiness, one meal at a time</strong>, while paving the way for a brighter and more sustainable future. Great food should come guilt-free fast for you, kind to the world.</p>
                    </div>
                )}

                {showWhy && (
                    <div>
                        <h2 className="text-2xl font-semibold text-orange-400 mt-6">Why &quot;Four Flavors Express&quot;?</h2>
                        <p className="mb-4">We celebrate the diversity of global food culture. Our name honors the &apos;four essential flours&apos;  Wheat, Rice, Corn, and Millet the pillars of cuisine across the world. Whether it&apos;s a classic pizza or a wholesome millet bowl, we deliver it all!</p>
                    </div>
                )}

                {showSpecial && (
                    <div>
                        <h2 className="text-2xl font-semibold text-orange-400 mt-6">What Makes Us Special?</h2>
                        <div className="space-y-2 pl-6">
                            <p>🛵 <strong>Eco-Friendly Electric Scooters</strong> – All our deliveries are made using electric scooters, ensuring zero emissions.</p>
                            <p>📦 <strong>Recyclable & Minimal Packaging</strong> – We work with partners to reduce plastic waste and use biodegradable materials whenever possible.</p>
                            <p>🍽️ <strong>Diverse Menu</strong> – From your local favorites to exotic dishes, we cover all cravings.</p>
                            <p>⚡ <strong>Lightning-Fast Delivery</strong> – Because fresh food tastes best when it’s hot!</p>
                            <p>📱 <strong>Easy Ordering</strong> – Our app is designed for smooth ordering and real-time tracking.</p>
                            <p>❤️ <strong>Local Love</strong> – We support small restaurants and home chefs, giving local talent a platform to shine.</p>
                        </div>
                    </div>
                )}

                {showGreenCommitment && (
                    <div>
                        <h2 className="text-2xl font-semibold text-orange-400 mt-6">Our Green Commitment 🌱</h2>
                        <p className="mb-4">We understand the impact of food delivery on the environment. That’s why sustainability is baked into our DNA:</p>

                        <div className="space-y-2 pl-6">
                            <p>🛵 Electric scooters = <strong>Zero tailpipe emissions</strong></p>
                            <p>📲 Paperless receipts & digital menus = <strong>Less paper waste</strong></p>
                            <p>🍴 Biodegradable cutlery & containers = <strong>Cleaner future</strong></p>
                            <p>📦 Encouraging restaurants to adopt = <strong>sustainable packaging</strong></p>
                            <p>♻️ We actively recycle packaging returned by customers</p>
                        </div>
                    </div>
                )}

                {showJoinMovement && (
                    <div>
                        <p className="mt-6">By choosing <strong>Four Flours Express</strong>, you&apos;re not only satisfying your hunger you&apos;re contributing to a smarter, more sustainable future. Delicious food with a side of innovation — now that’s a recipe for happiness!</p>

                        <h2 className="text-2xl font-semibold text-orange-400 mt-6">Join the Movement</h2>
                        <p className="mb-4">Whether you’re ordering dinner or partnering with us as a restaurant, let’s work together to make food delivery smarter, tastier, and more sustainable for the future. Every bite counts!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutUs;

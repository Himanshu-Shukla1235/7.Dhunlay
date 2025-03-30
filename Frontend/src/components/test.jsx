import { useEffect } from "react";

const Checkout = () => {
    const handlePayment = async () => {
        const res = await fetch("http://localhost:5000/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 500, currency: "INR" }),
        });
        const order = await res.json();

        const options = {
            key: "YOUR_RAZORPAY_KEY_ID",
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            name: "Dhunlay",
            description: "Payment for music service",
            handler: async (response) => {
                const verifyRes = await fetch("http://localhost:5000/verify-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response),
                });

                const verifyData = await verifyRes.json();
                alert(verifyData.message);
            },
            prefill: { name: "User", email: "user@example.com", contact: "9999999999" },
            theme: { color: "#3399cc" },
        };

        const razor = new window.Razorpay(options);
        razor.open();
    };

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return <button onClick={handlePayment}>Pay Now</button>;
};

export default Checkout;

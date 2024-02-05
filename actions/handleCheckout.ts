import getStripe from "@/utils/get-stripejs";

export const HandleCreateCheckout = async (priceId: string) => {
    const res = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        body: JSON.stringify(priceId),
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    const checkoutSession = await res.json().then((value) => {
        return value.session;
    });
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.id,
    });
};

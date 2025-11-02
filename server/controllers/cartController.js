import User from "../models/User.js";

// Update user cart data : /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body; // frontend sends only cartItems
        const userId = req.user.id;      // get authenticated user id from middleware

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        await User.findByIdAndUpdate(userId, { cartItems });
        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

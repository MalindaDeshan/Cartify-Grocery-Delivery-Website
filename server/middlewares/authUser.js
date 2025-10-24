import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id }; // ✅ store in req.user
            next();
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
}

export default authUser;

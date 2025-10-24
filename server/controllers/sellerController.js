import jwt from 'jsonwebtoken';

//Login Seller : /api/seller/login

export const sellerLogin = async(req, res) => {
    try {
        const {email, password} = req.body;

    if(email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD){
        const sellerToken = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('sellerToken', sellerToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.json({success: true, message: "Seller logged in successfully"});
    }
    else {
        return res.json({success: false, message: "Invalid seller credentials"});
    }

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

//Seller Authentication Check : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
};

//Seller Logout : /api/seller/logout
//Logout User : /api/user/logout
export const Sellerlogout = async(req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:  process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({success: true, message: "logged out successfully"});
    } catch (error) {
        console.error(error.message);
        return res.json({success: false, message:error.message});
    }
}
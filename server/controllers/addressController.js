import Address from "../models/Address.js";

// Add Address
export const addAddress = async (req, res) => {
  try {
    const userId = req.user.id; // from authUser middleware
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone
    } = req.body;

    await Address.create({
      userId,
      firstName,
      lastName,
      email,
      addressLine1: street, // map street to addressLine1
      street,
      city,
      state,
      zipCode: Number(zipcode),
      country,
      phone
    });

    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get Address
export const getAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await Address.find({ userId });
    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

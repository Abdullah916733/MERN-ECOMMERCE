import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";

// REGISTER USER
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "sample id",
        url: "profile Url.",
      },
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // checking if user has given password and email both
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please Enter email and password." });

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password." });

    const isPasswordMatched = user.comparePassword(password);

    if (!isPasswordMatched)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password." });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

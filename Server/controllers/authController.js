const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email, // ✅ fixed typo
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message, // ✅ fixed
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id, // ✅ fixed
      },
      process.env.JWT_SECRET_KEY, // ✅ recommended
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ✅ VERY IMPORTANT EXPORT
module.exports = {
  register,
  login,
};
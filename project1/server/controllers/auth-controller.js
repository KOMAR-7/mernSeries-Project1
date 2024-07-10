const User = require('../models/user-model')
const bcrypt = require('bcrypt')
// Home logic start
const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("Hello Omar I am from router as well!! Home page")
    } catch (error) {
        console.log(error)
    }
}

// Home logic end

// Register Logic Start
// *-------------------------------
//* User Registration Logic 📝
// *-------------------------------
// 1. Get Registration Data: 📤 Retrieve user data (username, email, password).
// 2. Check Email Existence: 📋 Check if the email is already registered.
// 3. Hash Password: 🔒 Securely hash the password.
// 4. Create User: 📝 Create a new user with hashed password.
// 5. Save to DB: 💾 Save user data to the database.
// 6. Respond: ✅ Respond with "Registration Successful" or handle errors.


const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // Check if all required fields are present
        if (!username || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create and save the new user
        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        });

        // Generate a JWT
        const token = await userCreated.generateToken();

        // Send a success response
        res.status(200).json({
            message: "User registered successfully",
            user: userCreated,
            token: token,
            userId: userCreated._id.toString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
// Register Logic End

// Login Start
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the stored hashed password
        // const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
        const isPasswordCorrect = await userExist.comparePassword(password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate a token (assuming you have a method on the user schema for this)
        const token = await userExist.generateToken();

        // Respond with the token and user ID
        res.status(200).json({
            message: "Login successful",
            token,
            userId: userExist._id.toString()
        });
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: "Server error" });
        next(error);
    }
};
// Login End
// send user data logic start
const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };
// send user data logic end
module.exports = { home, register,login, user}
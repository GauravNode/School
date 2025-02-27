const userService = require('../services/userService');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, schoolId } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await userService.registerUser(name, email, password, role, schoolId);

        if (!user) {
            return res.status(400).json({ message: "User registration failed" });
        }

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) =>{
    try {
        const { email, password } = req.body;

        const response = await userService.loginUser(email, password);

        if (!response.success) {
            return res.status(401).json({ message: response.message });
        }

        res.json({ token: response.token, user: response.user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
}
}

module.exports = 
{
   registerUser,
   loginUser,
};

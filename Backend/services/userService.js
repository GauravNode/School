const User = require("../Models/User");
const { getHashedPassword, comparePassword, getAccessToken } = require("../utils/helpher");

const registerUser = async (name, email, password, role, schoolId) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already registered");
    }
    const hashedPassword = await getHashedPassword(password);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        schoolId: role === "schooladmin" ? schoolId : null 
    });

    await newUser.save();

    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        schoolId: newUser.schoolId,
     
    };
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return { success: false, message: "Invalid credentials" };
        }

        const token = getAccessToken({ id: user._id, role: user.role });

        return { success: true, token, user };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = {
    registerUser,
    loginUser
};

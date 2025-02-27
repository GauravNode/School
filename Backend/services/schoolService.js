const School = require("../Models/School");
const { getHashedPassword, comparePassword, getAccessToken } = require("../utils/helpher");

const registerSchool = async (name, email, phone, address, password) => {
    const existingSchool = await School.findOne({ email });
    if (existingSchool) {
        throw new Error("School already registered");
    }

    // Hash password using helper function
    const hashedPassword = await getHashedPassword(password);

    const school = new School({
        name,
        email,
        phone,
        address,
        password: hashedPassword
    });

    await school.save();

    return school;
};

const loginSchool = async ({ email, password }) => {
    const school = await School.findOne({ email });

    if (!school) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await comparePassword(password, school.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = getAccessToken({ id: school._id, email: school.email });

    return { token, school };
};

module.exports = {
    registerSchool,
    loginSchool
};

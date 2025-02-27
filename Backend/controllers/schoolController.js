const schoolService = require('../services/schoolService');


const registerSchool = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;

        if (!name || !email || !phone || !address || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const school = await schoolService.registerSchool(name, email, phone, address, password);
        if (!school) {
            return res.status(400).json({ error: "School registration failed" });
        }

        res.status(201).json({ message: 'School registered successfully', school });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginSchool = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const { token, school } = await schoolService.loginSchool({ email, password });

    res.status(200).json({
      message: "Login successful",
      token,
      school: {
        id: school._id,
        name: school.name,
        email: school.email,
        phone: school.phone,
        address: school.address
      }
    });

  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
   registerSchool,
   loginSchool,

   };

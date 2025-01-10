import { Blacklist } from "../models/blacklistToken.model.js";
import { User } from "../models/user.model.js";


const registerUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if ([firstname, lastname, email, password].some((field) => !field?.trim())) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ firstname, lastname, email, password });
        await user.save();

        const createdUser = await User.findById(user._id).select("-password");
        return res.status(201).json({ createdUser });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token)

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    res.status(200).json(req.user)
}

const logoutUser = async (req, res) => {
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];    
    await Blacklist.create({ token })

    res.status(200).json({ message: "Logged out" })
}



export { registerUser, loginUser, getUserProfile, logoutUser };

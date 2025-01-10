import { Blacklist } from "../models/blacklistToken.model.js";
import { Captain } from "../models/captain.model.js";


const registerCaptain = async (req, res) => {
    const { firstname, lastname, email, password, vehicle } = req.body;

    
    if ([firstname, lastname, email, password].some((field) => !field?.trim()) ||
        !vehicle?.color || !vehicle?.plateNumber || !vehicle?.capacity || !vehicle?.vehicleType) {
        return res.status(400).json({ 
            message: "All fields are required, including vehicle details" 
        });
    }

    try {
      
        const existedCaptain = await Captain.findOne({ email });
        if (existedCaptain) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        const captain = new Captain({ firstname, lastname, email, password, vehicle });
        
        await captain.hashPassword();
        await captain.save();
        
        const createdCaptain = await Captain.findById(captain._id).select("-password");

        const token = captain.generateAuthToken();

        return res.status(201).json({ 
            token,
            createdCaptain 
        });

    } catch (error) {
        console.error("Error registering captain:", error.message);
        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
};

const loginCaptain = async (req, res) => {
    try {
        const {email, password} = req.body;
        const captain = await Captain.findOne({email})

        if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        const isMatch = await captain.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = captain.generateAuthToken();

        const captainWithoutPassword = await Captain.findById(captain._id).select("-password");

        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({ 
            token,
            captain: captainWithoutPassword
        });

    } catch (error) {
        console.error("Error logging in captain:", error.message);
        return res.status(500).json({ 
            message: "Internal Server Error" 
        });
    }
}

const getCaptainProfile = async (req, res) => {
    res.status(200).json(req.captain)
}

const logoutCaptain = async(req, res) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];    
    await Blacklist.create({ token });
    res.status(200).json({ message: "Captain logged out" });
}




export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain }
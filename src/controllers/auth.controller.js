import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import blacklistTokenModel from "../models/blacklist.model.js";



async function registerUserController(req, res) {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const isUserAlreadyRegisterd = await userModel.findOne({
        $or: [{ username }, { email }], // Check for both username and email 
        });

    if (isUserAlreadyRegisterd) {
        return res.status(400).json({ message: "User already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    
        const user = await userModel.create({
            username, 
            email,
            password: hash,
        });

        const token = jwt.sign({ id: user._id , username: user.username }, 
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token);

        res.status(201).json({ message: "User registered successfully",   
            user :{
                id: user._id,
                username: user.username,
                email: user.email
            }

        });
    }


async function loginController(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" });

        res.cookie("token", token);
        res.status(200).json({ message: "User logged in successfully",
        user :{
            id: user._id,
            username: user.username,
            email: user.email
        }});  

} 

async function logoutUserController(req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Unauthorized"});
    }
    if(token){ 
        await blacklistTokenModel.create({token});
        
    }
    res.clearCookie("token");
    res.status(200).json({message : "User logged out successfully"});
}


export { registerUserController , loginController , logoutUserController };

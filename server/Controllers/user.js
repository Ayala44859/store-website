import { productModel } from "../Model/product_resource.js";
import { userModel } from "../Model/user_resource.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import Joi from "joi"; // ייבוא Joi



// const updateUserSchema = Joi.object({
//     userName: Joi.string().optional(),
//     email: Joi.string().email().optional(),
//     role: Joi.string().valid('USER', 'MANAGER').optional()
// });

// const updatePasswordSchema = Joi.object({
//     userName: Joi.string().required(),
//     newPassword: Joi.string().min(6).required()
// });

const userSignUpSchema = Joi.object({
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    
});

export async function addUser_signUp(req, res) {
    const { error } = userSignUpSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            title: "Invalid data",
            message: error.details[0].message
        });
    }

    let { body } = req;
    try {
        let alreadyUser = await userModel.findOne({ userName: body.userName }).lean();
        if (alreadyUser) {
            return res.status(409).json({
                title: "User already exists",
                message: "Change user name"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, 10);

        let newUser = new userModel({
            ...body,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({
            title: "Cannot add new user",
            message: err.message
        });
    }
}
const loginSchema = Joi.object({
    userName: Joi.string().min(3).required(),
    password: Joi.string().min(6).required()
});

export async function login(req, res) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            title: "Invalid credentials",
            message: error.details[0].message
        });
    }

    let { userName, password } = req.body;
    try {
        let user = await userModel.findOne({ userName }).lean();
        if (!user) {
            return res.status(404).json({
                title: "Login failed",
                message: "Invalid userName"
            });
        }
console.log(password);
console.log(user.password);

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(404).json({
                title: "Login failed",
                message: "Invalid password"
            });
        }

        let { password: aaa, ...other } = user;
        other.token = generateToken(other);
        res.json(other);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            title: "Error logging in",
            message: err.message
        });
    }
}

export async function getUserById(req, res) {
    let { id } = req.params;
    try {
        let getUserbyId = await userModel.findById(id);
        if (!getUserbyId)
            return res.status(404).json({
                title: "cannot get user by id",
                message: "no user with such id"
            });
        res.json(getUserbyId);
    }
    catch (err) {
        res.status(400).json({
            title: "cannot get user by id",
            message: err.message
        });
    }
}

export async function getAllUsers(req, res) {
    try {
        let getAll = await userModel.find();
        res.json(getAll);
    }
    catch (err) {
        res.status(400).json({
            title: "cannot get all users",
            message: err.message
        });
    }
}

export async function updateUser(req, res) {
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            title: "Invalid update data",
            message: error.details[0].message
        });
    }

    let { id } = req.params;
    let { body } = req;
    try {
        let user = await userModel.findByIdAndUpdate(id, body, { new: true });
        if (!user) {
            return res.status(404).json({
                title: "User not found",
                message: "No user found with the given ID"
            });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({
            title: "Error updating user",
            message: err.message
        });
    }
}

export async function updateUserPassword(req, res) {
    const { error } = updatePasswordSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            title: "Invalid password update request",
            message: error.details[0].message
        });
    }

    let { userName, newPassword } = req.body;
    try {
        let user = await userModel.findOne({ userName });
        if (!user) {
            return res.status(404).json({
                title: "User not found",
                message: "No user found with the given userName"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();
        res.json({
            title: "Password updated successfully",
            user: { userName: user.userName, id: user._id }
        });
    } catch (err) {
        res.status(500).json({
            title: "Error updating password",
            message: err.message
        });
    }
}

import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';  // here we are importing the bcryptjs library to hash the password
import { generateTokenAndSetCookie } from "../utils/generate.Token.js";

export async function signup(req, res) {   // here we are exporting the signup function so that we can use it in other files
    try {
        const { email, password, username } = req.body;  // getting the user data from the request body which is sent by the client 

        if (!email || !password || !username) {  // this means if this is not provided by the client then we will ask the client to provide the data
            return res.status(400).json({ success: false, message: 'All fields are required' });  // here we are sending the response to the client
        } 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // this is the format of the email address other than this format the email address will not be accepted

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email address' });  // this line is checking the format if wrong then user will be asked to provide the correct email address
        }

        if (password.length < 8) {  
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' }); 
        }

        const existingUserByEmail = await User.findOne({email: email});  // checks if the user already exists in the database by email

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });  // this will direct the user to provide the new email address
        }

        const existingUserByUsername = await User.findOne({username: username});  // checks if the user already exists in the database by username

        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: 'User with this username already exists' });  // this will direct the user to provide the new username
        }

        const salt = await bcryptjs.genSalt(10);  // this is the salt that we are using to hash the password
        const hashedPassword = await bcryptjs.hash(password, salt);  // this means hash the password with the salt so that the password will be secure

        // after this we will create a new user profile in the database

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];  // this is the array of the profile pictures that we are using for the user profile

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];  // this is the random image that we are using for the user profile and this is based on above array

        const newUser = new User({
            email,
            password: hashedPassword,    // this means we are saving the hashed password to the database
            username,
            image
        });  // here we are creating a new user object with the user data that we got from the client

            generateTokenAndSetCookie(newUser._id, res);  // it is used to generate the token and set the token in the cookie\
            await newUser.save();  // here we are saving the user object to the database this will save the user object to the user collection in the database
            res.status(201).json({ success: true, user: {    // meaning of this line is 201 is the status code that means the user is created successfully
                ...newUser._doc,                             // this means we are sending the user object to the client
                password: ""                                 // this means we are not sending the password to the client
            }});  // this is the response that we are sending to the client after the user is created successfully

    } catch (error) {
        console.log("Error in signup controller", error.message);  // this line means if any error occurs then it will be shown in the console
        return res.status(500).json({ success: false, message: 'Internal server error' });  // this is the error message that will be shown to the user if any error occurs
    }
}

export async function login(req, res) {    // here we are exporting the login function so that we can use it in other files
    try {
        const { email, password } = req.body;  // only email and password is required to login no need of username
        if (!email || !password) {             // if the email and password is not provided then the user will be asked to provide the email and password
            return res.status(400).json({ success: false, message: 'All fields are required' }); // this is the response that will be sent to the client
        }

        // after this we will check if the user exists in the database or not by finding the user by email
        const user = await User.findOne({email: email});  
        if (!user) {                                    // if the user does not exist in the database then the user will be asked to provide the correct email and password
            return res.status(404).json({ success: false, message: 'Invalid Credentials' });   
        }

        // afteer this we will check if the password is correct or not
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);  // this line means we are comparing the password with the hashed password in the database that user provided
        if (!isPasswordCorrect) {  // if the password is incorrect then the user will be asked to provide the correct password
            return res.status(400).json({ success: false, message: 'Invalid Credentials' });
        }

        // if we pass all the if checks then we will generate the token and set the token in the cookie

        generateTokenAndSetCookie(user._id, res); 

        res.status(200).json({ 
            success: true, 
            user: {
                ...user._doc,
                password: ""
            }
        });  
    } catch (error) {
        console.log("Error in login controller", error.message);  
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export async function logout(req, res) {   // here we are exporting the logout function so that we can use it in other files
    try {
        res.clearCookie("jwt-netflix");  // clear the cookie with the name jwt-netflix
        // after clearing the cookie the usere will be logged out
        res.status(200).json({ success: true, message: 'Logged out successfully' });  // this means the user is logged out successfully
    } catch (error) {
        console.log("Error in logout controller", error.message);  
        res.status(500).json({ success: false, message: 'Internal server error' });
    }}


export async function authCheck(req, res) { 
    try {
        res.status(200).json({ success: true, user: req.user });  // this means the user is authenticated
    } catch (error) {
        console.log("Error in authCheck controller", error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// from here delete evrtthing this is the code that doesnt mean anything

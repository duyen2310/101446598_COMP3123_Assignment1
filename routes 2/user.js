const express = require("express")
const userModel = require("../models/userModel")
const routes = express.Router()
require('dotenv').config()

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// create user 
// routes.post("/signup", async (req, res) => {
//     let userName = req.body.username
//     let userEmail = req.body.email
//     let userPassword = req.body.password
//     try {
//         //check if user exist
//         let curr_user = await userModel.findOne({ email: userEmail });
//         if(curr_user===null){

//         //hash pwd
//         let hashed_pass = await bcrypt.hash(userPassword, 12)
//         //create a new user instance
//         let user = new userModel({ username: userName, email: userEmail, password: hashed_pass })

//         const newUser = await user.save()
//         res.send({"message":"User created successfully.", "user_id": newUser.id})
//         }
//         else {
//             res.send(JSON.stringify({ "status": false, "message": "Entered email already exists." }))
//         }

//     } catch (error){
//         res.status(500).send({message: error.message});
//     }
// })

routes.post("/signup", 
    // Custom validator 
    body('email').custom(async value => {
        const user = await UserCollection.findUserByEmail(value);
        if (user) {
            throw new Error('E-mail already in use');
        }
        }),
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
        }

        // Extract validated email and password
        let userEmail = req.body.email;
        let userPassword = req.body.password;

        try {
            // Hash password
            let hashed_pass = await bcrypt.hash(userPassword, 12);

            // Create a new user instance
            let user = new userModel({ email: userEmail, password: hashed_pass });

            const newUser = await user.save();
            res.send({ message: "User created successfully.", user_id: newUser.id });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
);
  
routes.post("/login", async(req,res)=>{
    try{
        let userEmail = req.body.email
        let userPassword = req.body.password

        let curr_user = await userModel.findOne({ email: userEmail });
        if(curr_user===null){
            res.send(JSON.stringify({ "status": false, "message": "User doesnt exist." }))
        }
        else{
            //chech pwd
            await bcrypt.compare(userPassword, curr_user.password, (err, result) => {
                if (result)
                    res.status(200).send(JSON.stringify({ "message": "Login successful" }))
                else
                    res.status(400).json({ "message": "Incorrect Password" })
            })
        }

    }
    catch(err){
        res.status(500).send({message: error.message});
    }
})
module.exports = routes
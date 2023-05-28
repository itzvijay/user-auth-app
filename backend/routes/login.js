const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const getAuthToken = require("../utils/getAuthToken");

router.post("/",async (req,res) => {
    const schema = Joi.object({
        email : Joi.string().min(3).max(200).required().email(),
        password:Joi.string().min(6).max(1024).required(),
    });

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("invalid email or the password");

    const isValid = await bcrypt.compare(req.body.password,user.password);
    if(!isValid) return res.status(400).send("invalid email or the password");

    const token = getAuthToken(user);
    res.send(token);
});

module.exports = router;
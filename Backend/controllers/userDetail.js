const user = require('../models/userProfiledetails')
const fs = require('fs');

const postUserDetail = async (req, res) => {
  console.log(req.file);
  let profilePic = (req.file)? req.file.filename : null; 
  console.log(req.paras.email);
  const {
    username,
    email,
    address,
    occupation,
    age,
    city,
    state,
    pincode,
    about,
    AccountHolder,
    AccountNumber,
    IFSCcode,
    NGOname,
    NGOregd,
    NGOvision,
    NGOachiv,
    NGOsector,
  } = req.body

  try {
    const oldUser = await user.findOne({
      username,
      email,
      AccountNumber,
      IFSCcode,
    })
    if (oldUser) {
      res.status(400).send('User Already Exists')
    }
    const Uzer = await user.create({
      username,
      email,
      address,
      occupation,
      age,
      city,
      state,
      pincode,
      about,
      AccountHolder,
      AccountNumber,
      IFSCcode,
      profilePic
    })
    res.json({ status:"ok", info: Uzer })
  } catch (error) {
    console.log(error)
  }
}

const getUserDetail = async(req,res)=>{
    const Email=req.paras.email;   
    try {
        const uzzer=await user.findOne({email : Email});
        res.json({status:"ok",uzzer:uzzer});
    } catch (error) {
        console.log(error)
    }
}

const getAllUserDetail = async(req,res)=>{  
  try {
      const uzzer=await user.find({});
      res.json({status:"ok",uzzer:uzzer});
  } catch (error) {
      console.log(error)
  }
}

const postNGOdetail = async (req, res) => {
  const reqObject = req.body
  const Email = req.paras.email
  try {
    const obj = await user.findOne({email : Email})
    console.log(obj._doc);
    const updateObj = {...(obj._doc),...( reqObject)}
    console.log(updateObj);
    const uzzer = await user.findOneAndUpdate(
      { email: Email },
      updateObj,
      {
        new: true,
        runValidators: true,
      }
    )
    if (!uzzer) {
      res.status(404).json({msg: `NO uzzer with ${NGOname} `})
    }
    res.json({ status:"ok",uzzer:uzzer})
  } catch (error) {
    console.log(error)
  }
}

const getNGOdetail = async (req, res) => {
  const Email = req.paras.email
  try {
    const uzzer = await user.findOne({ email: Email })
    res.json({ status:"ok",uzzer:uzzer })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {postUserDetail,getUserDetail,getNGOdetail,postNGOdetail,getAllUserDetail}
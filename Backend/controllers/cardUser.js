const card = require('../models/card')
// var multer = require('multer')
// var path = require('path')
// const fs = require('fs')

const postCards = async (req, res) => {
  const { title, description, amount, day, img, slug , user, email, amountRaised, category, vname,phone,location,AccountName,AccountNumber,IFSCcode} = req.body
  try {
    const oldTitle = await card.findOne({ slug })
    if (oldTitle) {
      res.status(404).send('Title Already Exists')
    }
    const Title = await card.create(
      {
        title,
        description,
        amount,
        day,
        img,
        slug,
        user,
        email,
        amountRaised,
        category,
        vname,
        phone,
        location,
        AccountName,
        AccountNumber,
        IFSCcode
      }
      // req.body
    )
    res.json({
      status: 'ok',
      data: Title,
    })
  } catch (error) {
    res.status(500).json({
      msg: error,
    })
  }
  // res.status(200).send("Hiiii");
}

const updateCards = async (req, res) => {
  const {slug,amt} = req.body
  const obj= await card.findOne({slug:slug});
  const alreadyAmount=obj.amountRaised;
  const updatedAmount=alreadyAmount+amt;

  const updated={...(obj._doc),amountRaised:updatedAmount}
    const uzzer=await card.findOneAndUpdate({slug:slug},updated,{
        new:true,
        runValidator:true,
      })
    res.json({
        data:uzzer,
        status:"ok"
    })

}

const getCards=async(req,res)=>{
    const detail=await card.find({});
    res.send({status : "ok", info:detail})
}



module.exports = {postCards,getCards,updateCards}
const payments=require('../models/payments');

const postPayer=async(req,res)=>{
    const Email=req.paras.email;
    const {slug,amt}=req.body;
    const oldTitle = await payments.findOne({ slug:slug,email:Email})
    if (oldTitle) {
      return res.json({
        status:"update",
      })
    }
    const payerz=await payments.create({
        email:Email,
        username:req.paras.username,
        slug:slug,
        amount: amt
    })
    res.send({status : "ok", info:payerz})
    // res.send("hahahah");
  }

  const updatePayer=async(req,res)=>{
    const Email=req.paras.email;
    const {slug,amt}=req.body;
    const obj = await payments.findOne({ slug:slug,email:Email})
    const alreadyAmount=obj.amount;
    const updatedAmount=alreadyAmount+amt;
    

    const updated={...(obj._doc),amount:updatedAmount}
    // console.log(updated);
    const uzzer=await payments.findOneAndUpdate({slug:slug,email:Email},updated,{
        new:true,
        runValidator:true,
      })
    res.json({
        data:uzzer,
        status:"ok"
    })
  }

  const getAllPayer=async(req,res)=>{
    const {slug}=req.body;
    const payer=await payments.find({slug:slug});
    res.json({
       data:payer,
       status:"ok",
    })
  }
    const getSinglePayer=async(req,res)=>{
        const Email=req.paras.email
        const payer=await payments.find({email:Email});
        res.json({
           data:payer,
           status:"ok",
        })
  }

  module.exports={postPayer,updatePayer,getAllPayer,getSinglePayer}
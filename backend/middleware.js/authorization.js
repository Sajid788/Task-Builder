const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authorization = (req,res, next) =>{
    if(!req.headers.authorization){
       return  res.send({msg:"login first"})
    }
   const token = req.headers.authorization.split("Bearer ")[1];
   jwt.verify(token,process.env.JWT_SECRET, function(err, decoded) {
     if(err){
       res.send({msg:" wrong Credential"});
     }
     req.userId = decoded.userId
     
     next();
  });
}

module.exports = {authorization};
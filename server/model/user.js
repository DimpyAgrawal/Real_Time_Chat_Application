const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema=new mongoose.Schema(
  {
    user_id:{
      type:String,
      required:true
    },
    first_name:{
      type: String,
    },
    dob_day:{
      type:Number,
    },
    dob_month:{
      type:Number,
    },
    dob_year:{
      type:Number,
    },
    show_gender:{
      type:String,
    },
    gender_identity:{
      type:String,
    },
    gender_interest:{
      type:String,
    },
    about:{
      type:String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
    },
    // likedUser:{
    //   type: [ObjectId],
    //   ref: "UserChat",
    // },
    // likedCard: {
    //   type: [ObjectId],
    //   ref: "UserChat",
    // },
    // friend:{
    //   type: [ObjectId],
    //   ref: "UserChat",
    // },
  },
  {timestamps:true}
);

let User=mongoose.model('User',userSchema)
module.exports=User;

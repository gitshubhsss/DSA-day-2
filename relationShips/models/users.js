const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

main()
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log(err);
  });

//define the schmea

const userSchema = new mongoose.Schema({
  username: String,
  addresses: [
    {
      location: String,
      city: String,
      place:String
    },
  ],
});

//define the model

const User = mongoose.model("User", userSchema);


const delUser=async()=>{
 let res= await User.findByIdAndDelete("6682d3128d825a44f88381b2")
 console.log(res);
}

delUser();
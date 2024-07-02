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

//define the schema for the user

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

//define the schema for the post

const postSchema = new mongoose.Schema({
  content: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//now we have to create a models for this
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// userSchema.post("findOneAndDelete", async (userdata) => {
//     let result = await Post.deleteMany({user:userdata._id});
//     console.log(result);
//     console.log("post deleted");
// });

// const addData = async () => {
//   let user3=await User.findById("6683b510ba8d21ca5aa39c6a");
//   let post3 = new Post({
//     content: "i have been preparing for the exam since last time ",
//     likes: 85,
//   });
//   post3.user=user3;
//   let post = await post3.save();
//   console.log(post);
// };

// addData();

// const deleteuser=async ()=>{
//     let data=await User.findByIdAndDelete("6682d375d1ca82e1deb14229");
//     console.log(data);

// }
// deleteuser();

//now we are going to delete the user so that the post will be automatically delete

let deluser = async () => {
  let user = await User.findByIdAndDelete("6683b510ba8d21ca5aa39c6a");
  console.log("user deleteted");
  let post=await Post.deleteMany({user:user._id});
  console.log(post);
};
deluser();

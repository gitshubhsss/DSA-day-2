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

//defining the orderSchema
const orderSchema = new mongoose.Schema({
  item: String,
  price: Number,
});

//defining the customer schema

const customerSchema = new mongoose.Schema({
  name: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
   let result= await Order.deleteMany({ _id: { $in: customer.orders } });//this is basically deleting the orders
   console.log(result);
  }
});

//defining the order module
const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// const findCustomer=async()=>{

//   let result=await Customer.find({}).populate("orders");
//   console.log(result[0]);

// }
// findCustomer();

// const addCustomer=async()=>{
//   let newCust=new Customer({
//     name:"shraddha mam",
//   })
//   let newOrder=new Order({
//     item:"Pizza",
//     price:400
//   });
//   newCust.orders.push(newOrder);
//   await newOrder.save();
//   await newCust.save();
//   console.log("added new customer");
// }

// addCustomer();

const delCust = async () => {
  let data = await Customer.findByIdAndDelete("6682dd2755143a1a6c723371");//this is basically deleting the customer
};

delCust();

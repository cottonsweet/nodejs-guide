import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      productData: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;

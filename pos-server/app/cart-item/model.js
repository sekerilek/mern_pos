const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartItemSchema = Schema({
  name: {
    type: String,
    required: [true, "name must be filled"],
  },

  qty: {
    type: Number,
    required: [true, "qty harus diisi"],
  },

  price: {
    type: Number,
    defaul: 0,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = model("CartItem", cartItemSchema);

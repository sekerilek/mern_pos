const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema({
  name: {
    type: String,
    required: [true, "kategori harus diisi"],
    minlength: [3, "panjang kategori minimal 3 karakter"],
    maxlength: [20, "panjang kategori maksimal 20 karakter"],
  },
});

module.exports = model("Category", categorySchema);

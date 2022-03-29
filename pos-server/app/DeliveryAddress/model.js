const { Schema, model } = require("mongoose");

const deliveryAddressSchema = Schema(
  {
    nama: {
      type: String,
      required: [true, "Nama alamat harus diisi"],
      maxlength: [255, "panjang maksimal alamat adalah 255 karakter"],
    },

    kelurahan: {
      type: String,
      required: [true, "Kelurahan harus diisi"],
      maxlength: [255, "panjang maksimal kelurahan adalah 255 karakter"],
    },

    kecamatan: {
      type: String,
      required: [true, "Kecamatan harus diisi"],
      maxlength: [255, "panjang maksimal kecamatan adalah 255 karakter"],
    },

    kabupaten: {
      type: String,
      required: [true, "Kabupaten harus diisi"],
      maxlength: [255, "panjang maksimal kabupaten adalah 255 karakter"],
    },

    provinsi: {
      type: String,
      required: [true, "Provinsi harus diisi"],
      maxlength: [255, "panjang maksimal provinsi adalah 255 karakter"],
    },

    detail: {
      type: String,
      required: [true, "detail alamat harus diisi"],
      maxlength: [1000, "panjang maksimal detail alamat adalah 1000 karakter"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

module.exports = model("DeliveryAddress", deliveryAddressSchema);

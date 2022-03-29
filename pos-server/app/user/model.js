const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const bcrypt = require("bcrypt");

let userSchema = Schema(
  {
    full_name: {
      type: String,
      require: [true, "nama harus diisi"],
      maxlength: [255, "panjang nama antara 3-255 karakter"],
      minlength: [3, "panjang nama antara 3-255 karakter"],
    },

    customer_id: {
      type: Number,
    },

    email: {
      type: String,
      require: [true, "email harus diisi"],
      maxlength: [255, "panjang email maksimal 255 karakter"],
    },

    password: {
      type: String,
      require: [true, "password harus diisi"],
      maxlength: [255, "panjang password maksimal 255 karakter"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    token: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },
  (attr) => `${attr.value} harus merupakan email yang valid!`
);

userSchema.path("email").validate(
  async function (value) {
    try {
      // pencarian collection user berdasarkan email
      const count = await this.model("User").count({ email: value });

      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

const HASH_ROUND = 10;
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

userSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

module.exports = model("User", userSchema);

const Product = require("../product/model");
const CartItem = require("../cart-item/model");

const update = async (req, res, next) => {
  try {
    const items = [req.body];

    const [data] = items.map((item) => item.cart);
    const productIds = Object.values(data).map((item) => item._id);
    //console.log(productIds);

    const products = await Product.find({ _id: { $in: productIds } });
    let cartItems = Object.values(data).map((item) =>
      //item.cart[Object.keys(items)]._id
      {
        let reletedProduct = products.find(
          (product) => product._id.toString() === item._id
        );
        return {
          product: reletedProduct._id,
          price: reletedProduct.price,
          image_url: reletedProduct.image_url,
          name: reletedProduct.name,
          user: req.user._id,
          qty: item.quantity,
        };
      }
    );
    //console.log(cartItems);
    await CartItem.deleteMany({ user: req.user._id });
    await CartItem.bulkWrite(
      cartItems.map((item) => {
        return {
          updateOne: {
            filter: {
              user: req.user._id,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        };
      })
    );
    return res.json(cartItems);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.error,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let items = await CartItem.find({ user: req.user._id }).populate("product");

    return res.json(items);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.error,
      });
    }
    next(err);
  }
};

module.exports = { index, update };

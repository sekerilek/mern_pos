const router = require("express").Router();
const { police_check } = require("../../middlewares");
const deliveryAddressController = require("./controller");

router.post(
  "/delivery-address",
  police_check("create", "DeliveryAddress"),
  deliveryAddressController.store
);

router.put(
  "/delivery-address/:id",
  police_check("edit", "DeliveryAddress"),
  deliveryAddressController.update
);

router.delete(
  "/delivery-address/:id",
  police_check("delete", "DeliveryAddress"),
  deliveryAddressController.destroy
);

router.get(
  "/delivery-address",
  police_check("view", "DeliveryAddress"),
  deliveryAddressController.index
);
module.exports = router;

const User = require("../../models/User");
const CustomerRep = require("../../models/CustomerRep");
const OperationsTeam = require("../../models/OperationsTeam");

exports.dbValidator = async (req, update) => {
  let arr = [];
  const { email, password } = req.body;
  const UserColl = await User.findOne({ email });
  UserColl && arr.push(UserColl.email);
  const CustomerRepColl = await CustomerRep.findOne({ email });
  CustomerRepColl && arr.push(CustomerRepColl.email);
  const OperationsColl = await OperationsTeam.findOne({ email });
  OperationsColl && arr.push(OperationsColl.email);
  console.log("arr", arr);
  const user = UserColl
    ? UserColl
    : CustomerRepColl
    ? CustomerRepColl
    : OperationsColl;
  console.log("------------------------User", UserColl);
  console.log("------------------------CustomerRep", CustomerRepColl);
  console.log("------------------------Operations", OperationsColl);
  console.log("update", update == "update" && arr.length == 1);
  if (update == "update" && arr.length == 1) {
    console.log("not in db");
    return (res = { success: true });
  } else if (UserColl || CustomerRepColl || OperationsColl) {
    console.log("already in db");
    return (res = { success: false, user });
  } else {
    console.log("not in db");
    return (res = { success: true });
  }
};

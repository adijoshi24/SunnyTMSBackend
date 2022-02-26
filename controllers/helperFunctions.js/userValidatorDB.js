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
  const user = UserColl
    ? UserColl
    : CustomerRepColl
    ? CustomerRepColl
    : OperationsColl;
  if (update == "update" && arr.length == 1) {
    return (res = { success: true });
  } else if (UserColl || CustomerRepColl || OperationsColl) {
    return (res = { success: false, user });
  } else {
    return (res = { success: true });
  }
};

// DEPENDANCIES
import getDBUrl from "../getDataUrl";
import model from "../../classes/model.class";
import { Database } from "../../../types.bot";
import SysLog from "../sysLog";
import { config as env } from "dotenv";
import mongoose from "mongoose";

// SCHEMAS
import "./schemas/user.schema";

// MAIN
const initDB = async () => {
  env();

  mongoose
    .connect(getDBUrl())
    .then(() => {
      SysLog.success({ content: "Connected to mongoose database", type: 3 });
    })
    .catch((err) => {
      SysLog.error({
        content: `Failed to connect to mongoose database ${err}`,
        type: 3,
      });
    });

  // LOAD MODELS
  const UserModel = mongoose.model("Users");

  // IMPLEMENT MODELS
  let db: Database = {
    users: new model(UserModel, "User"),
  };

  return db;
};

export default initDB;

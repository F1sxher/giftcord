import { config } from "dotenv";
import sysLog from "./sysLog";
config();

export default () => {
  try {
    let url: string | any = process.env.DB_URL;
    let urlSUsr: string[] = url.split("{USER}");
    url = `${urlSUsr[0]}${process.env.DB_USER}${urlSUsr[1]}`;
    let urlSPass: string[] = url.split("{PASS}");
    url = `${urlSPass[0]}${process.env.DB_PASS}${urlSPass[1]}`;
    return url;
  } catch (error) {
    sysLog.error({
      content: `Unable to Parse Database URL | ${error}`,
      type: 3,
    });
  }
};

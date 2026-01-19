
// import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../app";


export default (req: any, res: any) => {
  return app(req, res); // Let Express handle everything
};

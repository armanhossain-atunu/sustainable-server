import app from "../src/app";

export default async function handler(req: any, res: any) {
  await app(req, res); 
  return app(req, res);
}
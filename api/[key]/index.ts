import router from "../../src/router";
import { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const { key, ...query } = req.query;
  const reqKey = (Array.isArray(key) ? key[0] : key) ?? "stats";

  if (reqKey in router) {
    const Card = router[reqKey as keyof typeof router];
    res.setHeader("Content-Type", "image/svg+xml");
    const result = await new Card(query).generateSvgString(
      res.setHeader.bind(res)
    );
    res.send(result);
  } else {
    res.status(404).send("404 Not Found");
  }
};

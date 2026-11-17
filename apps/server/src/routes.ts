import { Router } from "express";
import { urls, reverse } from "./store";
import { generateShortCode } from "./utils/short-code";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

router.post("/shorten", async (req, res) => {
  const { url } = req.body;

  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  let id = reverse.get(url);

  if (!id) {
    id = generateShortCode();
    urls.set(id, url);
    reverse.set(url, id);
  }

  res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${id}` });
  console.log({ urls });
});

router.get("/:id", async (req, res) => {
  const target = urls.get(req.params.id);
  if (!target) return res.status(404).json({ error: "Not found" });
  res.redirect(target);
});

export default router;

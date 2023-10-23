import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

router
  .use(() => {
    upload.single("coverImage");
  })
  .post((req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "success" });
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await router.run(req, res);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ error: e.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

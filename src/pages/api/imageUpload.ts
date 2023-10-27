import { NextApiRequest, NextApiResponse } from "next";
import ImageKit from "imagekit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const options = {
    publicKey: process.env.IMAGEKIT_PUBLIC_API as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_API as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
  };

  const imageKit = new ImageKit(options);

  try {
    const response = await imageKit.upload({
      file: req.body,
      fileName: "post-cover-image",
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

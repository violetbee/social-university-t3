import Busboy from "busboy";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const uploadFile = (req: NextApiRequest, res: NextApiResponse) => {
  const bb = Busboy({ headers: req.headers });
  bb.on("file", async (_, file, info) => {
    const fileName = info.filename;
    try {
      const parallelUploads = new Upload({
        client: s3,
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
        params: {
          Bucket: process.env.BUCKET_NAME as string,
          Key: `${Math.random().toString(36).substring(2, 15)}-${fileName}`,
          Body: file,
        },
      });
      const data = await parallelUploads.done();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });
  bb.on("close", () => {
    res.writeHead(200, { Connection: "close" });
    res.end("File uploaded");
  });
  req.pipe(bb);
  return;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case "POST":
      return uploadFile(req, res);
  }
}

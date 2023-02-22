import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import runMiddleware from "@/lib/runMiddleware";
import uploadS3 from "@/lib/awsUpload";
import crypto from "crypto";

interface RequestWithFile extends NextApiRequest {
  file?: any;
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: RequestWithFile, res: NextApiResponse) => {
  try {
    const coverImageName = crypto.randomBytes(32).toString("hex");

    if (req.method === "POST") {
      await runMiddleware(req, res, upload.single("coverImage"));
      console.log(req.file);
      console.log(req.body);

      if (!req.file) return res.status(400).json({ error: "File empty" });

      const uploadResult = (await uploadS3(
        process.env.AWS_S3_BUCKET_NAME as string,
        coverImageName,
        req.file.buffer,
        req.file.mimetype,
      )) as { Location: string };

      return res.json({ src: uploadResult.Location, error: "" });
    }

    return res.status(404).json({ error: "404 not found" });
  } catch (error: any) {
    return res.status(500).json({ error: error.name, message: error.message });
  }
};

export default handler;

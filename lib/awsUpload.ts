import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

//configure client
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.APP_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.APP_AWS_SECRET_KEY as string,
  },
  region: "eu-central-1",
});

const upload = async (
  bucket: string,
  fileName: string,
  buffer: Buffer,
  mimetype: any,
) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ContentType: mimetype,
    };

    const putCommand = new PutObjectCommand(params);

    s3.send(putCommand, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

export default upload;

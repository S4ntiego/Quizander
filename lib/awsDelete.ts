import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3"

//configure client
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.APP_AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.APP_AWS_SECRET_KEY as string,
  },
  region: "eu-central-1",
})

const deleteImage = async (bucket: string, key: string) => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucket,
      Key: key,
    }

    const deleteCommand = new DeleteObjectCommand(params)

    s3.send(deleteCommand, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

export default deleteImage

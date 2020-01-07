const aws = require("aws-sdk");
const FfmpegCommand = require("fluent-ffmpeg");

module.exports = (bucket, videoFilename, screenshotFilename) =>
  new Promise((resolve, reject) => {
    const s3 = new aws.S3({ region: "us-east-1" });
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: bucket,
      Key: videoFilename,
      Expires: 300
    });
    const command = new FfmpegCommand(signedUrl);
    command
      .on("error", err => {
        reject(err);
      })
      .on("end", () => {
        resolve(screenshotFilename);
      })
      .screenshots({
        timestamps: [5],
        filename: screenshotFilename
      });
  });

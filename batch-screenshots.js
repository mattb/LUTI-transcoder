const aws = require("aws-sdk");
const fs = require("fs");

const s3 = new aws.S3({ region: "us-east-1" });

const screenshotVideo = require("./screenshotVideo");

s3.listObjects({ Bucket: "lifeundertheice-raw" })
  .promise()
  .then(x => x.Contents.map(c => c.Key).filter(v => v.endsWith(".mp4")))
  .then(videos =>
    videos.forEach(v =>
      screenshotVideo("lifeundertheice-raw", v, v.replace(/mp4$/, "jpg")).then(
        f => {
          fs.access(f, fs.constants.F_OK, e => {
            if (e) {
              console.log(f, "does not exist");
              return;
            }
            const Body = fs.createReadStream(f);
            s3.putObject({
              Key: f,
              Body,
              ContentType: "image/jpeg",
              Bucket: "lifeundertheice",
              ACL: "public-read"
            })
              .promise()
              .then(upload => console.log(f, "uploaded", upload))
              .catch(err => console.log(f, "error", err));
          });
        }
      )
    )
  );

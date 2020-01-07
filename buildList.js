/* global require, module */
const aws = require("aws-sdk");

const s3 = new aws.S3({ region: "us-east-1" });

const listAllKeys = params => {
  const p = { Bucket: "lifeundertheice" };
  if (params) {
    Object.assign(p, params);
  }
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(p)
      .promise()
      .then(data => {
        const ks = data.Contents.map(d => d.Key).filter(k =>
          k.endsWith(".m3u8")
        );
        if (!data.IsTruncated) {
          resolve(ks);
        } else {
          listAllKeys({ ContinuationToken: data.NextContinuationToken })
            .then(moreData => resolve(ks.concat(moreData)))
            .catch(e => reject(e));
        }
      })
      .catch(e => reject(e));
  });
};

module.exports = callback => {
  listAllKeys()
    .then(data => {
      const playlist = {
        m3u8: data
      };
      s3.putObject(
        {
          Bucket: "lifeundertheice",
          Key: "m3u8.json",
          Body: JSON.stringify(playlist),
          ContentType: "application/json",
          ACL: "public-read"
        },
        callback
      );
    })
    .catch(err => callback(err));
};

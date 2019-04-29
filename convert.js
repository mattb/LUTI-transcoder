/* global require, module */
const aws = require('aws-sdk');

const PipelineId = '1548039311520-hhiw1e';
const PresetId = '1351620000001-200015';

module.exports = (fileKey, callback) => {
  const elastictranscoder = new aws.ElasticTranscoder({ region: 'us-east-1' });

  const Input = {
    Key: fileKey
  };

  const Output = {
    PresetId,
    Key: fileKey.replace(/\.mp4$/, '')
  };

  elastictranscoder.createJob({ PipelineId, Input, Output }, callback);
};

/* global require, module */
const aws = require('aws-sdk');

const PipelineId = '1548039311520-hhiw1e';
const PresetId = '1569302061448-7wrs9a';

module.exports = (fileKey, callback) => {
  const elastictranscoder = new aws.ElasticTranscoder({ region: 'us-east-1' });

  const Input = {
    Key: fileKey
  };

  const Output = {
    PresetId,
    SegmentDuration: '5.0',
    Key: fileKey.replace(/\.mp4$/, '')
  };

  elastictranscoder.createJob({ PipelineId, Input, Output }, callback);
};

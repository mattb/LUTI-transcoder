/* global require, module */
const aws = require('aws-sdk');

const PipelineId = '1548039311520-hhiw1e';
const PresetId = '1575096974967-o3cmgx';

module.exports = (fileKey, callback) => {
  const elastictranscoder = new aws.ElasticTranscoder({ region: 'us-east-1' });

  const Input = {
    Key: fileKey
  };

  const outputKey = fileKey.replace(/\.mp4$/, '');
  const Output = {
    PresetId,
    SegmentDuration: '1.0',
    Key: outputKey,
    ThumbnailPattern: fileKey.replace(/\.mp4$/, '-{count}')
  };

  const Playlists = [
    {
      Format: 'HLSv4',
      Name: `${outputKey}-playlist`,
      OutputKeys: [outputKey]
    }
  ];

  elastictranscoder.createJob(
    { PipelineId, Input, Output, Playlists },
    callback
  );
};

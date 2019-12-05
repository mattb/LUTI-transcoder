/* global require, module */
const aws = require('aws-sdk');

const PipelineId = '1548039311520-hhiw1e';
const PresetIds = [
  '1575139606514-gdm3bw',
  '1575431325080-s3xrem',
  '1575434396298-50o34r'
];

module.exports = (fileKey, callback) => {
  const elastictranscoder = new aws.ElasticTranscoder({ region: 'us-east-1' });

  const Input = {
    Key: fileKey
  };

  const outputKey = fileKey.replace(/\.mp4$/, '');
  const Outputs = PresetIds.map((pid, idx) => ({
    SegmentDuration: '2.0',
    PresetId: pid,
    Key: `${outputKey}-${idx}`
  }));

  const Playlists = [
    {
      Format: 'HLSv4',
      Name: `${outputKey}-playlist`,
      OutputKeys: Outputs.map(o => o.Key)
    }
  ];

  elastictranscoder.createJob(
    { PipelineId, Input, Outputs, Playlists },
    callback
  );
};

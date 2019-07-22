/* global exports, console, require */
const convert = require('./convert');

exports.handler = (event, context) => {
  console.log('processing', JSON.stringify(event));
  const eventRecord = event.Records && event.Records[0];
  if (eventRecord) {
    if (
      eventRecord.eventSource === 'aws:s3' &&
      eventRecord.s3 &&
      eventRecord.s3.bucket.name === 'lifeundertheice-raw'
    ) {
      convert(eventRecord.s3.object.key, (error, data) => {
        if (error) {
          context.fail(JSON.stringify(error));
        } else {
          context.done(JSON.stringify(data));
        }
      });
    } else {
      context.fail('unsupported event source');
    }
  } else {
    context.fail('no records in the event');
  }
};

Use Lambda S3 triggers to automatically transcode videos on upload.

To clear out the output S3:

$ aws s3 rm s3://lifeundertheice --recursive
$ aws s3 rm s3://lifeundertheice-thumbs --recursive

To touch all the input files and retrigger the transcoding job:

$ aws s3 cp --recursive --metadata "{\"touched\":\"$(date -u +'%Y-%m-%dT%H:%M:%SZ')\"}" s3://lifeundertheice-raw s3://lifeundertheice-raw

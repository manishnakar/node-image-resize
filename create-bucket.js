import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey:process.env.S3_ACCESS_SECRET,
});

const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    createBucketConfiguration: {
        locationConstraint: "eu-west-1"
    }
};

s3.createBucket(params, function(err, data){
    if(err) console.error(err, err.stack);
    else console.log('Bucket created successfully', data.Location)
})



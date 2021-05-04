# node-image-resize

A simple boilerplate project to implement AWS S3 file upload functionality in a Node, React app. Using Multer and Multer-s3 for uploading file.

### To launch this project in the local machine

- Run `npm install`
- Run `cd client`
- Run `npm install`
- Run `cd ..`
- Run `npm start`

It will start the server at [http://localhost:5000/](http://localhost:5000/)

### Most importantly remember to replace AWS S3's bucket_name, AWSAccessKeyId and AWSSecretKey wth your own. I have kept those keys of mine in the .env file in the project root, and which ofcourse have been put in the gitignore file so not be make them public.

### Example .env file (WHICH NEVER BE PUSHED TO ANY PUBLIC REPOSITORY LIKE GITHUB )

    PORT=5000
    S3_ACCESS_KEY=accesskeyprovided
    S3_ACCESS_SECRET=accesssecretprovided
    S3_REGION=us-east-2
    S3_BUCKET_NAME=profile-avatar

## ALWAYS PUT THIS .env FILE IN THE .gitignore FILE

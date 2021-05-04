'use strict'

import express from 'express'
import multer from 'multer';
import multerS3 from 'multer-s3';
import cors from 'cors';
import aws from 'aws-sdk';
const path = require('path');

const app = express();
//const multerStorage = multer.memoryStorage();
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/fullsize')
  },
  filename: (req, file, cb) => { 
    cb(null, Date.now() + path.extname(file.originalname))

  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({  
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, //1MB
  }
}).single("image");

const bucketName = process.env.S3_BUCKET_NAME;

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: process.env.S3_REGION,
});

const s3 = new aws.S3();

const uploadS3 = multer({
  fileFilter: multerFilter,
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket:  bucketName ,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
  }),
}).single("image");

// Include the express body parser
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "client/build")))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async function (req, res) {
  res.send("welcome to image upload via node");  
});

app.post('/upload', async (req, res) => {

  upload(req, res, (err)=> {
    if(err instanceof multer.MulterError){
      return res.send(err) //multer error 
    }else if(err) {
      return res.send(err) //normal error 
    }
  }) ;
 
  return res.status(200).json({ name: req.filename }); 

});

app.post('/upload/s3', (req, res) => {

  uploadS3(req, res, (err)=> {
    if(err instanceof multer.MulterError){
      return res.send(err) //multer error 
    }else if(err) {
      return res.send(err) //normal error 
    }
  }) ;

  const fileContent = fs.readFileSync(req.filename)

})



const port = process.env.PORT || 5000
app.listen(port)